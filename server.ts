import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 57893;

  app.use(express.json());

  // Monobank API Configuration
  const MONO_API_URL = "https://api.monobank.ua/api/merchant";
  const MONO_TOKEN = process.env.MONOBANK_TOKEN;

  // API Route for Monobank Payment Creation
  app.post("/api/payment/create", async (req, res) => {
    try {
      if (!MONO_TOKEN) {
        throw new Error("MONOBANK_TOKEN is not set in environment variables");
      }
      const { amount, description, metadata } = req.body;
      
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      const redirectUrl = `${appUrl}/payment-result`;

      const payload = {
        amount: amount || 150000, // in cents
        ccy: 980, // UAH
        merchantPaymInfo: {
          destination: description || "Оплата участі у конференції EL2026",
          comment: "Конференція 'Елементи Лідерства 2026'. Дякуємо за реєстрацію!",
          referrer: appUrl,
        },
        redirectUrl: redirectUrl,
        webHookUrl: "", // Можна додати URL для серверних сповіщень
        validity: 3600,
        paymentType: "debit",
      };

      const response = await axios.post(`${MONO_API_URL}/invoice/create`, payload, {
        headers: {
          "X-Token": MONO_TOKEN,
          "Content-Type": "application/json",
        },
      });

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error("Monobank Create Invoice Error:", error.response?.data || error.message);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create payment", 
        error: error.response?.data || error.message 
      });
    }
  });

  // API Route for Monobank Payment Status
  app.get("/api/payment/status/:invoiceId", async (req, res) => {
    try {
      if (!MONO_TOKEN) {
        throw new Error("MONOBANK_TOKEN is not set in environment variables");
      }
      const { invoiceId } = req.params;
      const { registrationId } = req.query;

      const response = await axios.get(`${MONO_API_URL}/invoice/status?invoiceId=${invoiceId}`, {
        headers: {
          "X-Token": MONO_TOKEN,
        },
      });

      const data = response.data;

      // If payment is successful and we have a registrationId, update Google Sheets
      if (data.status === "success" && registrationId) {
        const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        if (webhookUrl) {
          try {
            await axios.post(webhookUrl, {
              registrationId,
              status: "Оплачено",
              updateOnly: true // Flag for Apps Script to know this is an update
            });
            console.log(`Payment status updated to 'Оплачено' for ${registrationId}`);
          } catch (webhookError: any) {
            console.error("Failed to update payment status in Google Sheets:", webhookError.message);
          }
        }
      }

      res.status(200).json(data);
    } catch (error: any) {
      console.error("Monobank Status Check Error:", error.response?.data || error.message);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check payment status", 
        error: error.response?.data || error.message 
      });
    }
  });

  // API Route for Registration
  app.post("/api/register", async (req, res) => {
    try {
      const { fullName, phone, region, church, plan } = req.body;
      const registrationId = `REG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const registrationData = {
        registrationId,
        fullName,
        phone,
        region,
        church,
        plan: plan || "Не вказано",
        timestamp: new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }),
        status: "Очікується оплата"
      };

      console.log("New registration attempt:", registrationData);

      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

      if (webhookUrl) {
        try {
          // Forward to Google Sheets Webhook (Apps Script)
          await axios.post(webhookUrl, registrationData);
          console.log("Data successfully sent to Google Sheets");
        } catch (webhookError: any) {
          console.error("Failed to send data to Google Sheets:", webhookError.message);
        }
      }

      res.status(200).json({ 
        success: true, 
        message: "Registration successful",
        registrationId 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
