/**
 * Оновлений скрипт для Google Apps Script зі строгою валідацією.
 * Інструкція:
 * 1. Відкрийте вашу Google Таблицю.
 * 2. Оберіть Розширення (Extensions) -> Apps Script.
 * 3. Замініть існуючий код функцій doPost на цей.
 * 4. Натисніть "Розгорнути" (Deploy) -> "Нове розгортання" (New deployment).
 * 5. Оберіть тип "Веб-застосунок" (Web app), доступ - "Кожен" (Anyone).
 * 6. Натисніть "Розгорнути" та скопіюйте URL (якщо він змінився, оновіть його в App.tsx).
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return logError("Empty request body");
    }

    var data = JSON.parse(e.postData.contents);
    
    // Сувора перевірка на ботів та коректність даних
    var fullName = (data.fullName || "").toString().trim();
    var phone = (data.phone || "").toString().replace(/\D/g, ""); // Залишаємо тільки цифри
    var region = (data.region || "").toString().trim();
    var church = (data.church || "").toString().trim();
    var plan = (data.plan || "Квиток").toString().trim();

    // 1. Блокуємо порожні або занадто короткі імена (менше 3 символів)
    if (fullName.length < 3) {
      return logError("Rejected: Name too short or empty (" + fullName + ")");
    }
    
    // 2. Блокуємо некоректні номери телефону (має бути хоча б 10 цифр)
    if (phone.length < 10) {
      return logError("Rejected: Phone number invalid (" + phone + ")");
    }

    // 3. Блокуємо записи, де вказано "---", що характерно для ботів
    if (region === "---" || church === "---" || fullName === "---" || phone === "---") {
      return logError("Rejected: Bot pattern detected (dashes)");
    }

    // 4. Блокуємо, якщо обов'язкові поля справді порожні
    if (!region || !church || region === "Оберіть область") {
      return logError("Rejected: Missing required fields (region/church)");
    }

    // Готуємо рядок для запису
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    var orderId = "EL-" + timestamp.getTime();
    
    // Форматування часу для зручності
    var formattedDate = Utilities.formatDate(timestamp, "GMT+3", "dd.mm.yyyy, HH:mm:ss");

    // Запис у таблицю
    sheet.appendRow([
      orderId,
      formattedDate,
      fullName,
      "'" + (data.phone || ""), // Зберігаємо з одинарною лапкою на початку, щоб Excel/Sheets не перетворював на число
      region,
      church,
      plan,
      "Wait: Очікується"
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: orderId,
      message: "Data recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return logError("System error: " + error.toString());
  }
}

/**
 * Функція для повернення помилки у форматі JSON
 */
function logError(msg) {
  console.warn("Registration rejected: " + msg);
  return ContentService.createTextOutput(JSON.stringify({
    status: "error",
    message: msg
  })).setMimeType(ContentService.MimeType.JSON);
}
