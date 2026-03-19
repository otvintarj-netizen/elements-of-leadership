/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useSearchParams
} from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  UserCheck,
  LayoutGrid,
  Clock, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Zap,
  ShieldCheck,
  Globe,
  Send,
  Youtube,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Про конференцію', href: isHomePage ? '#about' : '/#about' },
    { name: 'Програма', href: isHomePage ? '#program' : '/#program' },
    { name: 'Воркшопи', href: isHomePage ? '#workshops' : '/#workshops' },
    { name: 'Спікери', href: isHomePage ? '#speakers' : '/#speakers' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-1 lg:py-1' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 py-0 flex justify-between items-center h-full">
        <Link to="/" className="flex items-center group">
          <img src="/logo-site.png" alt="Елементи лідерства" className={`w-auto object-contain group-hover:scale-105 transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-36 md:h-48'}`} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('#') ? (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-bold uppercase tracking-widest text-white/70 hover:text-brand-primary transition-colors ${isScrolled ? 'text-[10px]' : 'text-xs'}`}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`font-bold uppercase tracking-widest text-white/70 hover:text-brand-primary transition-colors ${isScrolled ? 'text-[10px]' : 'text-xs'}`}
              >
                {link.name}
              </Link>
            )
          ))}
          <a 
            href="#tickets" 
            className={`bg-brand-primary hover:bg-brand-primary/80 text-white px-6 rounded-full font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center ${isScrolled ? 'py-2 text-[10px]' : 'py-2.5 text-xs'}`}
          >
            Реєстрація
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-lg font-medium text-slate-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    className="text-lg font-medium text-slate-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <a 
                href="#tickets" 
                className="bg-brand-primary text-white px-6 py-3 rounded-xl text-center font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Зареєструватися
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-12 md:pt-48 md:pb-16 overflow-hidden bg-brand-primary">
      {/* Background Image - Mobile */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none md:hidden"
        style={{
          backgroundImage: "url('/телефон.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Background Image - Desktop */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: "url('/головна.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Shards */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="shard absolute top-[-10%] left-[5%] w-[30%] h-[120%] rotate-[15deg] opacity-40" />
        <div className="shard absolute top-[-20%] right-[10%] w-[25%] h-[140%] rotate-[-10deg] opacity-30" />
        <div className="shard absolute bottom-[-10%] left-[40%] w-[20%] h-[100%] rotate-[5deg] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="max-w-5xl"
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-6xl md:text-[10rem] font-display font-black leading-[0.85] mb-6 text-white uppercase tracking-tighter"
          >
            Елементи <br />
            лідерства
          </motion.h1>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9, rotate: -2 },
              visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, type: "spring" } }
            }}
            className="mb-10"
          >
            <div className="badge-slanted text-2xl md:text-5xl uppercase font-black tracking-tighter">
              Служіння з радістю
            </div>
          </motion.div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-lg md:text-2xl text-white/80 max-w-2xl mb-12 font-medium leading-tight"
          >
            Всеукраїнська конференція від Департаменту молоді УЦХВЄ для навчання та спорядження 
            діючих і потенційних молодіжних лідерів.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12"
          >
            <a 
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=%D0%95%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B8+%D0%BB%D1%96%D0%B4%D0%B5%D1%80%D1%81%D1%82%D0%B2%D0%B0:+%D1%81%D0%BB%D1%83%D0%B6%D1%96%D0%BD%D0%BD%D1%8F+%D0%B7+%D1%80%D0%B0%D0%B4%D1%96%D1%81%D1%82%D1%8E&dates=20260417T060000Z/20260418T180000Z&details=%D0%92%D1%81%D0%B5%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0+%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D1%96%D1%8F+%D0%B2%D1%96%D0%B4+%D0%94%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82%D1%83+%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D1%96+%D0%A3%D0%A6%D0%A5%D0%92%D0%84&location=%D1%86.+%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B4%D0%B0%D1%82%D1%8C,+%D0%B2%D1%83%D0%BB.+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+40,+%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%91%D0%BE%D1%80%D1%89%D0%B0%D0%B3%D1%96%D0%B2%D0%BA%D0%B0"
              target="_blank"
              rel="noopener noreferrer"
              title="Додати в календар"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-colors group"
            >
              <Calendar className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">17-18 квітня</span>
            </a>
            <a 
              href="https://www.google.com/maps/dir//%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0+%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B4%D0%B0%D1%82%D1%8C,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+40,+%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%91%D0%BE%D1%80%D1%89%D0%B0%D0%B3%D1%96%D0%B2%D0%BA%D0%B0,+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+08131/@49.8256729,24.0809814,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40d4cbced00fa625:0x9866db6b15949066!2m2!1d30.3737801!2d50.4020393?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank" 
              rel="noopener noreferrer"
              title="Відкрити в Google Maps"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-colors group"
            >
              <MapPin className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">ц. Благодать, Софіївська Борщагівка</span>
            </a>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-wrap gap-6"
          >
            <a 
              href="#tickets" 
              className="group bg-white text-brand-primary px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter transition-all flex items-center gap-2 shadow-2xl hover:scale-105"
            >
              Реєстрація
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const getPlural = (value: number, type: 'days' | 'hours' | 'minutes' | 'seconds') => {
    if (value >= 1 && value <= 4) {
      if (type === 'days') return 'дні';
      if (type === 'hours') return 'години';
      if (type === 'minutes') return 'хвилини';
      if (type === 'seconds') return 'секунди';
    }
    if (type === 'days') return 'днів';
    if (type === 'hours') return 'годин';
    if (type === 'minutes') return 'хвилин';
    if (type === 'seconds') return 'секунд';
    return '';
  };

  useEffect(() => {
    const targetDate = new Date('April 17, 2026 09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const elements = [
    { label: 'Dy', name: getPlural(timeLeft.days, 'days'), value: timeLeft.days, color: 'from-brand-primary to-emerald-500' },
    { label: 'Hr', name: getPlural(timeLeft.hours, 'hours'), value: timeLeft.hours, color: 'from-brand-primary to-indigo-500' },
    { label: 'Mn', name: getPlural(timeLeft.minutes, 'minutes'), value: timeLeft.minutes, color: 'from-brand-primary to-violet-500' },
    { label: 'Sc', name: getPlural(timeLeft.seconds, 'seconds'), value: timeLeft.seconds, color: 'from-brand-primary to-rose-500' }
  ];

  return (
    <section className="py-8 bg-brand-dark border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Compact Label */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-brand-primary animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] leading-tight">
                БЕЗПЕЧНА ОПЛАТА ЧЕРЕЗ WAYFORPAY
              </p>
              <h2 className="text-xl font-display font-black uppercase tracking-tighter leading-none">
                Конференція <br />
                <span className="text-brand-primary">наближається</span>
              </h2>
            </div>
          </div>

          {/* Compact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow max-w-3xl">
            {elements.map((el, idx) => (
              <motion.div
                key={el.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass px-6 py-4 rounded-2xl border border-white/5 relative group hover:border-brand-primary/30 transition-colors flex items-center gap-4"
              >
                <div className="text-[8px] font-black uppercase tracking-widest text-white/30 absolute top-2 left-4">
                  {el.label}
                </div>
                
                <div className="text-3xl md:text-4xl font-display font-black tracking-tighter text-white group-hover:text-brand-primary transition-colors mt-1">
                  {el.value.toString().padStart(2, '0')}
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">
                  {el.name}
                </div>

                {/* Subtle Glow */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${el.color} opacity-0 group-hover:opacity-5 transition-opacity blur-lg`} />
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl mb-8">Про конференцію</h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                <strong className="text-white">Елементи лідерства</strong> — це всеукраїнська конференція від Департаменту молоді УЦХВЄ, 
                який об'єднує діючих і потенційних молодіжних лідерів помісних церков для навчання та спорядження.
              </p>
              <p>
                Учасники отримують практичні інструменти для реалізації покликання, налагоджують корисні контакти 
                та переймають досвід від досвідчених служителів. Це час для духовного оновлення та стратегічного планування.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 md:p-12 rounded-3xl border-brand-primary/20 relative"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-primary/20 blur-3xl rounded-full" />
            <h3 className="text-2xl mb-6 text-brand-primary flex items-center gap-3 font-black uppercase tracking-tighter">
              <Users className="w-6 h-6" />
              Цільова аудиторія
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                { 
                  title: 'Молодіжні лідери та пастори', 
                  desc: 'для тих, хто вже веде за собою молодь.',
                  icon: UserCheck 
                },
                { 
                  title: 'Керівники церковних служінь', 
                  desc: 'для лідерів будь-яких напрямків, що шукають нові інструменти.',
                  icon: LayoutGrid 
                },
                { 
                  title: 'Команди молодіжних служінь', 
                  desc: 'для тих, хто служить разом і прагне синергії.',
                  icon: Users 
                },
                { 
                  title: 'Активна молодь', 
                  desc: 'для тих, хто прагнуть зростати та впливати.',
                  icon: Zap 
                }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="group cursor-help"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/90 font-bold text-lg leading-tight group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </span>
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
                        <div className="overflow-hidden">
                          <p className="text-white/50 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Program = () => {
  const days = [
    {
      date: '17 квітня',
      events: [
        { time: '08:30', title: 'Реєстрація / Ранкове кавування', desc: 'Початок конференції, час для спілкування.' },
        { time: '10:00', title: 'Час для радості. Старт', desc: 'Офіційне відкриття конференції.' },
        { time: '10:30', title: 'Козачок Анатолій', desc: 'Слово наставлення від старшого єпископа.' },
        { time: '11:00', title: 'Дослідження молодіжного служіння УЦХВЄ', desc: 'Презентація аналітичних даних.' },
        { time: '12:30', title: 'Кавування', desc: 'Час для нетворкінгу та кави.' },
        { time: '13:00', title: 'Орищин Олександр', desc: 'Тематична сесія.' },
        { time: '14:00', title: 'Обіднє частування', desc: 'Смачна перерва для всіх учасників.' },
        { time: '15:00', title: 'Воркшопи', desc: 'Практичні заняття за обраними напрямками.' },
        { time: '16:00', title: 'Кавування', desc: 'Відпочинок та обговорення воркшопів.' },
        { time: '17:00', title: 'Білик Іван', desc: 'Вечірня сесія.' },
        { time: '18:00', title: 'Вечірнє частування', desc: 'Завершення першого дня.' },
      ]
    },
    {
      date: '18 квітня',
      events: [
        { time: '09:00', title: 'Ранкове кавування', desc: 'Початок другого дня, кава та спілкування.' },
        { time: '10:00', title: 'Час для радості. Старт 2 дня', desc: 'Початок другого дня конференції.' },
        { time: '10:30', title: 'Мурах Ростислав', desc: 'Ранкова сесія.' },
        { time: '11:30', title: 'Кавування', desc: 'Коротка пауза для спілкування.' },
        { time: '12:30', title: 'Воркшопи', desc: 'Другий блок практичних занять.' },
        { time: '14:00', title: 'Обіднє частування', desc: 'Спільна трапеза.' },
        { time: '15:00', title: 'Ярошенко Ярослав', desc: 'Тематична сесія.' },
        { time: '16:00', title: 'Паночко Михайло', desc: 'Фінальне слово від почесного єпископа.' },
        { time: '17:00', title: 'Час для радості. Фініш', desc: 'Закриття конференції.' },
      ]
    }
  ];

  return (
    <section id="program" className="py-16 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">Програма конференції</h2>
          <p className="text-white/50">Насичений графік для твого максимального розвитку</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {days.map((day, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-black text-brand-primary mb-8 uppercase tracking-tighter">{day.date}</h3>
              <div className="space-y-6">
                {day.events.map((event, eIdx) => (
                  <div key={eIdx} className="flex gap-6 group">
                    <div className="text-brand-primary font-mono text-sm pt-1 shrink-0">{event.time}</div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-brand-primary transition-colors">{event.title}</h4>
                      <p className="text-white/40 text-sm mt-1">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Workshops = () => {
  const categories = [
    {
      title: 'Фундамент та Команда',
      icon: '⚡️',
      topics: [
        'Мистецтво побудови сильної команди.',
        'Малі групи як серце молодіжного служіння.',
        'Керівництво духовними дарами у служінні.'
      ]
    },
    {
      title: 'Місія та Охоплення',
      icon: '🌍',
      topics: [
        'Місіонерство та волонтерство: як залучати та надихати.',
        'Запуск Альфа-курсу: прості кроки до великих змін.',
        'Сучасні підходи до місії у вашому місті.'
      ]
    },
    {
      title: 'Інструменти та Проєкти',
      icon: '🛠',
      topics: [
        'Ефективний менеджмент івентів та проєктів.',
        'Організація християнських таборів, що змінюють життя.',
        'Специфіка та особливості роботи з підлітками.'
      ]
    }
  ];

  return (
    <section id="workshops" className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">Практичні воркшопи</h2>
          <p className="text-white/50">Від ідеї до втілення — обирай свій напрямок</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl border-brand-primary/10 hover:border-brand-primary/30 transition-colors group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                {cat.icon}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 text-white group-hover:text-brand-primary transition-colors">
                {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.topics.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Speakers = () => {
  const speakers = [
    {
      name: 'Козачок Анатолій',
      role: 'Старший єпископ УЦХВЄ',
      desc: 'Старший єпископ Української Церкви Християн Віри Євангельської.',
      image: '/speakers/Козачок.jpg'
    },
    {
      name: 'Мурах Ростислав',
      role: 'Єпископ УЦХВЄ в Хмельницькій області',
      desc: 'Єпископ УЦХВЄ в Хмельницькій області.',
      image: '/speakers/Мурах.webp'
    },
    {
      name: 'Паночко Михайло',
      role: 'Почесний єпископ УЦХВЄ',
      desc: 'Почесний єпископ Української Церкви Християн Віри Євангельської.',
      image: '/speakers/Паночко.webp'
    },
    {
      name: 'Білик Іван',
      role: 'Координатор служіння стратегії та розвитку УЦХВЄ',
      desc: 'Координатор молодіжного, медійного та дитячого департаментів, Соціологічної служби УЦХВЄ.',
      image: '/speakers/Білик.jpg'
    },
    {
      name: 'Орищин Олександр',
      role: 'Пастор церкви',
      desc: 'Служитель, що надихає молодь на розвиток.',
      image: '/speakers/Орищин Олександр 4.webp'
    },
    {
      name: 'Черняк Василь',
      role: 'Директор Департаменту молодіжного служіння УЦХВЄ',
      desc: 'Відповідальний за розвиток молодіжного служіння в братерстві.',
      image: '/speakers/Черняк Василь .webp'
    },
    {
      name: 'Ярошенко Ярослав',
      role: 'Пастор церкви',
      desc: 'Досвідчений служитель та наставник для лідерів.',
      image: '/speakers/Ярошенко.jpg'
    },
    {
      name: 'Кавун Юрій',
      role: 'Пастор церкви',
      desc: 'Керівник руху “Щастя Поруч”.',
      image: '/speakers/Кавун.webp'
    },
    {
      name: 'Григорчук Марк',
      role: 'Спікер конференції',
      desc: 'Заступник директора Департаменту молодіжного служіння УЦХВЄ.',
      image: '/speakers/Григорчук.webp'
    },
    {
      name: 'Бурчак Юрій',
      role: 'Керівник молодіжного руху “Орієнтир”',
      desc: 'Служитель, що фокусується на розвитку молодіжного лідерства.',
      image: '/speakers/Бурчак Юрій.JPG'
    },
    {
      name: 'Ференц Мільо',
      role: 'Пастор церкви, психолог, педагог, керівник «Платформа Розвитку Молодих Лідерів»',
      desc: 'Служитель з великим досвідом у молодіжному русі.',
      image: '/speakers/Ференц Мільо.PNG'
    },
    {
      name: 'Савін Макс',
      role: 'Волонтер та військовий капелан',
      desc: 'Керівник молоді УЦХВЄ в Київській області.',
      image: '/speakers/Савін Макс.webp'
    },
    {
      name: 'Савчук Назар',
      role: 'Керівник молодіжного руху «Левел»',
      desc: 'Керівник молоді УЦХВЄ у Волинській області.',
      image: '/speakers/Савчук Назар.webp'
    },
    {
      name: 'Барновський Сергій',
      role: 'Керівник БОБФ “Місце Зустрічі”',
      desc: 'Практик у сфері соціального служіння та допомоги.',
      image: '/speakers/барновський.JPG'
    },
    {
      name: 'Марченко Віталій',
      role: 'Пастор, керівник управління молоді Запоріжжя',
      desc: 'Керівник управління молоді УЦХВЄ в Запорізькій області.',
      image: '/speakers/Марченко.jpg'
    }
  ];

  return (
    <section id="speakers" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl mb-4">Наші спікери</h2>
            <p className="text-white/50 max-w-xl">Люди, які живуть тим, про що говорять. Отримай досвід від кращих практиків.</p>
          </div>
          <div className="hidden md:block">
            <Users className="w-16 h-16 text-brand-primary/20" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {speakers.map((speaker, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl glass"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  <span className="block">{speaker.name.split(' ')[0]}</span>
                  <span className="block">{speaker.name.split(' ').slice(1).join(' ')}</span>
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                  <div className="overflow-hidden">
                    <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[10px] sm:text-xs font-black text-brand-primary uppercase tracking-widest block leading-tight">{speaker.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Tickets = () => {
  const cutoffDate = new Date('2026-04-02T00:00:00+03:00'); // 2 квітня за Києвом
  const isAfterCutoff = new Date() >= cutoffDate;

  const plans = [
    {
      name: 'Рання реєстрація',
      period: 'до 1 квітня включно',
      price: '1500',
      features: ['Доступ до всіх сесій', 'Кава-брейки', 'Повноцінне харчування', 'Пакет учасника'],
      isPopular: !isAfterCutoff,
      isDisabled: isAfterCutoff
    },
    {
      name: 'Стандартна реєстрація',
      period: 'з 2 по 15 квітня',
      price: '1700',
      features: ['Доступ до всіх сесій', 'Кава-брейки', 'Повноцінне харчування', 'Пакет учасника'],
      isPopular: isAfterCutoff,
      isDisabled: false
    }
  ];

  const navigate = useNavigate();

  const handleSelectPlan = (price: string, name: string) => {
    navigate('/register', { state: { price, name } });
  };

  return (
    <section id="tickets" className="py-16 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">Вартість участі</h2>
          <p className="text-white/50">Оберіть зручний час для оплати та забронюйте своє місце</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative p-8 rounded-3xl flex flex-col ${plan.isPopular ? 'bg-brand-primary shadow-2xl shadow-brand-primary/20 md:scale-105 z-10' : 'glass'}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                  Найвигідніша ціна
                </div>
              )}
              <h3 className="text-xl font-black uppercase tracking-tighter mb-1">{plan.name}</h3>
              <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${plan.isPopular ? 'text-white/80' : 'text-white/50'}`}>{plan.period}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className="text-sm opacity-70 font-black uppercase tracking-tighter">грн</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-white' : 'text-brand-primary'}`} />
                    <span className="opacity-90 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => !plan.isDisabled && handleSelectPlan(plan.price, plan.name)}
                disabled={plan.isDisabled}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all text-center flex items-center justify-center gap-2 ${plan.isDisabled ? 'bg-white/10 text-white/30 cursor-not-allowed' : plan.isPopular ? 'bg-white text-brand-primary hover:bg-white/90' : 'bg-brand-primary text-white hover:bg-brand-primary/90'}`}
              >
                {plan.isDisabled ? 'Реєстрацію завершено' : `Зареєструватися (${plan.price} грн)`}
              </button>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center mt-12 text-white/30 text-xs uppercase font-bold tracking-widest">
          * Кількість місць обмежена місткістю залу. Рекомендуємо реєструватися заздалегідь.
        </p>
      </div>
    </section>
  );
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateInfo = location.state as { price: string; name: string } | null;
  // Default to Early Registration if no state is provided (e.g. from Retry button)
  const planInfo = stateInfo || { price: '1500', name: 'Рання реєстрація' };
  
  const [showOffer, setShowOffer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+380',
    region: '',
    church: '',
    agreeOffer: false,
    agreeData: false
  });

  const regions = [
    "Вінницька", "Волинська", "Дніпропетровська", "Донецька", "Житомирська", 
    "Закарпатська", "Запорізька", "Івано-Франківська", "Київська", "Кіровоградська", 
    "Луганська", "Львівська", "Миколаївська", "Одеська", "Полтавська", "Рівненська", 
    "Сумська", "Тернопільська", "Харківська", "Херсонська", "Хмельницька", 
    "Черкаська", "Чернівецька", "Чернігівська", "м. Київ"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (formData.fullName.trim().length < 3) newErrors.fullName = "Введіть повне ПІБ (мінімум 3 символи)";
    if (formData.phone.length < 13) newErrors.phone = "Введіть коректний номер телефону (10 цифр)";
    if (!formData.region) newErrors.region = "Будь ласка, оберіть область";
    if (formData.church.trim().length < 2) newErrors.church = "Введіть назву вашої церкви";
    if (!formData.agreeOffer) newErrors.agreeOffer = "Необхідна згода з умовами публічної оферти";
    if (!formData.agreeData) newErrors.agreeData = "Необхідна згода на обробку персональних даних";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Anti-spam honeypot check
    // @ts-ignore
    if (formData._gotcha) {
      console.warn('Spam detected via honeypot');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTHavH6suz9h9RsQsESiuuIRwsLNJbDdKypWBXSVx2RmUyb1P1Y5wCKj_AUHGjcuQR1Q/exec';

    try {
      // 1. Submit registration data to Google Script
      const registrationData = {
        fullName: formData.fullName,
        phone: formData.phone,
        region: formData.region,
        church: formData.church,
        plan: planInfo.name,
        amount: planInfo.price
      };

      // 1. Record to Google Sheet and save Order ID
      try {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(registrationData),
        });
        
        const resText = await response.text();
        try {
          const data = JSON.parse(resText);
          if (data.orderId) {
            localStorage.setItem('lastOrderId', data.orderId);
          }
        } catch (e) {
          console.warn('Response was not JSON:', resText);
        }
      } catch (err) {
        console.warn('Sheet record failed, but proceeding to payment...', err);
      }

      // 2. Direct Redirect to WayForPay Buttons
      const BTN_1500 = 'https://secure.wayforpay.com/button/be9202a2741d2';
      const BTN_1700 = 'https://secure.wayforpay.com/button/b494ef2210f47';
      
      // Fixed: use soft comparison or Number conversion to be sure
      window.location.href = Number(planInfo.price) === 1500 ? BTN_1500 : BTN_1700;

    } catch (error: any) {
      console.error('Registration/Payment error:', error);
      alert(error.message || 'Сталася помилка під час реєстрації. Спробуйте ще раз або зверніться до підтримки.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors mb-8 font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-center">
            Реєстрація учасника
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Невидимий захист від ботів (Honeypot) */}
            <div className="absolute opacity-0 pointer-events-none -z-50" aria-hidden="true">
              <input 
                type="text" 
                name="_gotcha"
                autoComplete="off"
                tabIndex={-1}
                // @ts-ignore
                onChange={(e) => setFormData({...formData, _gotcha: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/50 block">ПІБ</label>
              <input 
                required
                type="text"
                placeholder="Введіть ваше повне ім'я"
                className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none transition-colors placeholder:text-white/20 ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-primary'}`}
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({...formData, fullName: e.target.value});
                  if (errors.fullName) setErrors({...errors, fullName: ''});
                }}
              />
              {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/50 block">Номер телефону (Telegram)</label>
              <div className="relative flex items-center">
                <span className="absolute left-6 text-white font-medium">+38</span>
                <input 
                  required
                  type="tel"
                  placeholder="0 (__) ___-__-__"
                  className={`w-full bg-white/5 border rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none transition-colors placeholder:text-white/20 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-primary'}`}
                  value={formData.phone.replace('+38', '')}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) {
                      setFormData({...formData, phone: '+38' + val});
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }
                  }}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/50 block">Область</label>
              <div className="relative">
                <select 
                  required
                  className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none transition-colors appearance-none ${errors.region ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-primary'}`}
                  value={formData.region}
                  onChange={(e) => {
                    setFormData({...formData, region: e.target.value});
                    if (errors.region) setErrors({...errors, region: ''});
                  }}
                >
                  <option value="" disabled className="bg-brand-dark">Оберіть область</option>
                  {regions.map(r => (
                    <option key={r} value={r} className="bg-brand-dark">{r}</option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
              {errors.region && <p className="text-red-500 text-xs font-bold mt-1">{errors.region}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/50 block">Назва церкви</label>
              <input 
                required
                type="text"
                placeholder="Введіть назву вашої церкви"
                className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none transition-colors placeholder:text-white/20 ${errors.church ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-primary'}`}
                value={formData.church}
                onChange={(e) => {
                  setFormData({...formData, church: e.target.value});
                  if (errors.church) setErrors({...errors, church: ''});
                }}
              />
              {errors.church && <p className="text-red-500 text-xs font-bold mt-1">{errors.church}</p>}
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input 
                      required
                      type="checkbox"
                      className="peer sr-only"
                      checked={formData.agreeOffer}
                      onChange={(e) => {
                        setFormData({...formData, agreeOffer: e.target.checked});
                        if (errors.agreeOffer) setErrors({...errors, agreeOffer: ''});
                      }}
                    />
                    <div className={`w-5 h-5 border-2 rounded bg-white/5 peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-all flex items-center justify-center ${errors.agreeOffer ? 'border-red-500' : 'border-white/10'}`}>
                      <CheckCircle2 className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className={`text-sm transition-colors ${errors.agreeOffer ? 'text-red-400' : 'text-white/70 group-hover:text-white'}`}>
                    Я погоджуюсь з умовами{' '}
                    <Link 
                      to="/offer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:underline font-bold"
                    >
                      Публічної оферти
                    </Link>
                  </span>
                </label>
                {errors.agreeOffer && <p className="text-red-500 text-xs font-bold mt-1 pl-9">{errors.agreeOffer}</p>}
              </div>

              <div>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input 
                      required
                      type="checkbox"
                      className="peer sr-only"
                      checked={formData.agreeData}
                      onChange={(e) => {
                        setFormData({...formData, agreeData: e.target.checked});
                        if (errors.agreeData) setErrors({...errors, agreeData: ''});
                      }}
                    />
                    <div className={`w-5 h-5 border-2 rounded bg-white/5 peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-all flex items-center justify-center ${errors.agreeData ? 'border-red-500' : 'border-white/10'}`}>
                      <CheckCircle2 className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className={`text-sm transition-colors ${errors.agreeData ? 'text-red-400' : 'text-white/70 group-hover:text-white'}`}>Даю згоду на обробку персональних даних</span>
                </label>
                {errors.agreeData && <p className="text-red-500 text-xs font-bold mt-1 pl-9">{errors.agreeData}</p>}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg transition-all shadow-xl shadow-brand-primary/20 mt-8 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Обробка...
                </>
              ) : (
                `ЗАРЕЄСТРУВАТИСЯ ТА ОПЛАТИТИ (${planInfo?.price || '0'} ГРН)`
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-brand-dark/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="glass max-w-md w-full p-10 rounded-[40px] border border-white/10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary" />
              
              <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck className="w-10 h-10 text-brand-primary" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6">
                Дані прийнято!
              </h2>
              
              <p className="text-white/70 leading-relaxed mb-10 font-medium">
                Зараз ви будете перенаправлені на сторінку безпечної оплати <span className="text-white font-bold">Monobank</span>. 
                Після оплати обов’язково приєднуйтесь в <span className="text-brand-primary font-bold">Telegram-чат</span> учасників.
              </p>

              <button 
                onClick={() => {
                  window.location.href = "https://send.monobank.ua/jar/example";
                }}
                className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-transform"
              >
                ПЕРЕЙТИ ДО ОПЛАТИ
              </button>
              
              <button 
                onClick={() => setShowSuccess(false)}
                className="mt-6 text-white/30 hover:text-white/50 text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Закрити вікно
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-md"
            onClick={() => setShowOffer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 rounded-3xl border border-white/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowOffer(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 text-brand-primary">
                  ПУБЛІЧНА ОФЕРТА (ДОГОВІР)
                </h2>
                <p className="text-sm text-white/80 font-bold mb-4">
                  ПРО НАДАННЯ ПОСЛУГ З ОРГАНІЗАЦІЇ ТА ПРОВЕДЕННЯ КОНФЕРЕНЦІЇ
                </p>
                
                <div className="space-y-6 text-sm text-white/60 leading-relaxed">
                  <section>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">1. ЗАГАЛЬНІ ПОЛОЖЕННЯ</h3>
                    <p>1.1. Цей Договір є офіційною пропозицією (публічною офертою) ФОП Марченко Віталій Романович (надалі — «Виконавець») для будь-якої фізичної особи (надалі — «Замовник») укласти Договір про надання послуг з організації та проведення конференції.</p>
                    <p>1.2. Акцептом (прийняттям) цієї Оферти є повна оплата Замовником вартості участі на сайті. З моменту оплати Договір вважається укладеним.</p>
                  </section>

                  <section>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">2. ПРЕДМЕТ ДОГОВОРУ</h3>
                    <p>2.1. Виконавець зобов’язується надати послуги з організації участі Замовника у дводенній конференції «Елементи лідерства» (надалі — «Захід»), що відбудеться 17 та 18 квітня 2026 року за адресою: вул. Київська, 40, Софіївська Борщагівка, Київська обл. (Церква «Благодать»).</p>
                    <p>2.2. Послуги включають доступ до програми Заходу протягом обох днів, кава-брейки, харчування та пакет учасника.</p>
                  </section>

                  <section>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">3. ВАРТІСТЬ ПОСЛУГ ТА ПОРЯДОК РОЗРАХУНКІВ</h3>
                    <p>3.1. Вартість участі у Заході становить:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>При оплаті до 01 квітня 2026 року включно — 1500,00 грн.</li>
                      <li>При оплаті з 02 по 15 квітня 2026 року включно — 1700,00 грн.</li>
                    </ul>
                    <p>3.2. Оплата здійснюється у безготівковій формі через платіжний сервіс на сайті Виконавця. Реєстрація завершується 15 квітня 2026 року.</p>
                  </section>

                  <section>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">4. УМОВИ ВІДМОВИ ТА ПОВЕРНЕННЯ КОШТІВ</h3>
                    <p>4.1. У разі відмови Замовника від участі, повернення коштів здійснюється з урахуванням витрат Виконавця на адміністрування та бронювання послуг підрядників:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>При відмові до 27 березня 2026 року включно: повертається 90% від сплаченої суми. Утримана частка (10%) є сервісним збором, що покриває банківські комісії та витрати на реєстрацію.</li>
                      <li>При відмові з 28 березня по 07 квітня 2026 року включно: повертається 50% від сплаченої суми.</li>
                      <li>При відмові після 07 квітня 2026 року: повернення коштів не здійснюється, оскільки всі витрати на організацію участі Замовника є фактично понесеними та незворотними.</li>
                    </ul>
                    <p>4.2. Замовник може передати своє право участі іншій особі, повідомивши про це Виконавця не пізніше ніж за 48 годин до початку Заходу.</p>
                  </section>

                  <section>
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">5. ПЕРСОНАЛЬНІ ДАНІ</h3>
                    <p>5.1. Здійснюючи оплату, Замовник надає згоду на збір та обробку персональних даних (ПІБ, телефон, область, назва церкви) для організації Заходу та додавання до чату конференції у Telegram.</p>
                  </section>

                  <section className="pt-6 border-t border-white/10">
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">6. РЕКВІЗИТИ ВИКОНАВЦЯ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-white/40 uppercase mb-1">Виконавець</p>
                        <p className="text-white font-bold">ФОП Марченко Віталій Романович</p>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase mb-1">ІПН</p>
                        <p className="text-white font-bold">3340008753</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-white/40 uppercase mb-1">Адреса реєстрації</p>
                        <p className="text-white font-bold">м. Запоріжжя, вул. Фортечна, 88/102</p>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase mb-1">Email</p>
                        <p className="text-white font-bold">otvintarj@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase mb-1">Тел</p>
                        <p className="text-white font-bold">+38 (093) 786-91-47</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <button 
                onClick={() => setShowOffer(false)}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm mt-10"
              >
                Зрозуміло
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="pt-16 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-2">
            <div className="flex flex-wrap items-center gap-8 mb-10">
              <img src="/logo-elements.png" alt="Елементи лідерства" className="h-36 w-auto object-contain" />
            </div>
            <p className="text-white/60 max-w-sm mb-8 font-medium">
              Ми віримо, що кожен молодий лідер здатний змінити своє оточення через 
              щире служіння та постійний розвиток. Приєднуйся до спільноти майбутнього.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/gomolod" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://t.me/gomolod" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@gomolod" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-tighter mb-6">Контакти</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-primary" />
                <a href="https://gomolod.com.ua/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">gomolod.com.ua</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <a 
                  href="https://www.google.com/maps/dir//%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0+%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B4%D0%B0%D1%82%D1%8C,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,+40,+%D0%A1%D0%BE%D1%84%D1%96%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%91%D0%BE%D1%80%D1%89%D0%B0%D0%B3%D1%96%D0%B2%D0%BA%D0%B0,+%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+08131/@49.8256729,24.0809814,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40d4cbced00fa625:0x9866db6b15949066!2m2!1d30.3737801!2d50.4020393?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary transition-colors"
                  title="Відкрити в Google Maps"
                >
                  вул. Київська, 40, <br />
                  Софіївська Борщагівка, <br />
                  ц. Благодать
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-tighter mb-6">Навігація</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#about" className="hover:text-brand-primary transition-colors">Про конференцію</a></li>
              <li><a href="#program" className="hover:text-brand-primary transition-colors">Програма</a></li>
              <li><a href="#workshops" className="hover:text-brand-primary transition-colors">Воркшопи</a></li>
              <li><a href="#speakers" className="hover:text-brand-primary transition-colors">Спікери</a></li>
              <li><a href="#tickets" className="hover:text-brand-primary transition-colors">Реєстрація</a></li>
              <li className="pt-4">
                <a 
                  href="https://docs.google.com/document/d/1jTglOzrs2CZsMnyQCFts0jYIacF0vta0yaLLMBw2iAs/edit?tab=t.0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white/10 hover:bg-white/20 border border-white/10 hover:border-brand-primary text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg"
                >
                  Готелі для проживання
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30">
          <p>© 2026 Рух молоді УЦХВЄ. Усі права захищені.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Безпечна оплата через WayForPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTHavH6suz9h9RsQsESiuuIRwsLNJbDdKypWBXSVx2RmUyb1P1Y5wCKj_AUHGjcuQR1Q/exec';

  useEffect(() => {
    const lastOrderId = localStorage.getItem('lastOrderId');
    if (lastOrderId) {
      fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ orderId: lastOrderId, status: 'paid' })
      }).catch(err => console.error('Sheet update failed:', err));
      localStorage.removeItem('lastOrderId');
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 text-center">
      <div className="glass p-12 rounded-3xl max-w-sm w-full">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-brand-primary w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-primary mb-4">ДЯКУЄМО!</h2>
          <p className="text-white/70 mb-8 leading-relaxed">Вашу участь підтверджено. Приєднуйтесь до каналу:</p>
          <a href="https://t.me/+ECK1eTuA07UxNTE6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#229ED9] text-white px-8 py-4 rounded-2xl font-black uppercase text-sm w-full justify-center">
            <Send className="w-5 h-5" /> Telegram Канал
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const PaymentFailurePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 text-center">
      <div className="glass p-12 rounded-3xl max-w-sm w-full">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="text-red-500 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-red-500 mb-4">ОПЛАТА НЕ ПРОЙШЛА</h2>
        <p className="text-white/70 mb-8 leading-relaxed">Платіж було скасовано або відхилено банком.</p>
        <button onClick={() => navigate('/register')} className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-sm w-full">
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
};

const PublicOfferPage = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen bg-brand-dark relative px-6">
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl border border-white/10 prose prose-invert">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 text-brand-primary">
          ПУБЛІЧНА ОФЕРТА (ДОГОВІР)
        </h2>
        <p className="text-sm text-white/80 font-bold mb-4">
          ПРО НАДАННЯ ПОСЛУГ З ОРГАНІЗАЦІЇ ТА ПРОВЕДЕННЯ КОНФЕРЕНЦІЇ
        </p>
        
        <div className="space-y-6 text-sm text-white/60 leading-relaxed">
          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">1. ЗАГАЛЬНІ ПОЛОЖЕННЯ</h3>
            <p className="mb-2">1.1. Цей Договір є офіційною пропозицією (публічною офертою) ФОП Марченко Віталій Романович (надалі — «Виконавець») для будь-якої фізичної особи (надалі — «Замовник») укласти Договір про надання послуг з організації та проведення конференції.</p>
            <p>1.2. Акцептом (прийняттям) цієї Оферти є повна оплата Замовником вартості участі на сайті. З моменту оплати Договір вважається укладеним.</p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">2. ПРЕДМЕТ ДОГОВОРУ</h3>
            <p className="mb-2">2.1. Виконавець зобов’язується надати послуги з організації участі Замовника у дводенній конференції «Елементи лідерства» (надалі — «Захід»), що відбудеться 17 та 18 квітня 2026 року за адресою: вул. Київська, 40, Софіївська Борщагівка, Київська обл. (Церква «Благодать»).</p>
            <p>2.2. Послуги включають доступ до програми Заходу протягом обох днів, кава-брейки, харчування та пакет учасника.</p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">3. ВАРТІСТЬ ПОСЛУГ ТА ПОРЯДОК РОЗРАХУНКІВ</h3>
            <p className="mb-2">3.1. Вартість участі у Заході становить:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>При оплаті до 01 квітня 2026 року включно — 1500,00 грн.</li>
              <li>При оплаті з 02 по 15 квітня 2026 року включно — 1700,00 грн.</li>
            </ul>
            <p>3.2. Оплата здійснюється у безготівковій формі через платіжний сервіс на сайті Виконавця. Реєстрація завершується 15 квітня 2026 року.</p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">4. УМОВИ ВІДМОВИ ТА ПОВЕРНЕННЯ КОШТІВ</h3>
            <p className="mb-2">4.1. У разі відмови Замовника від участі, повернення коштів здійснюється з урахуванням витрат Виконавця на адміністрування та бронювання послуг підрядників:</p>
            <ul className="list-disc pl-5 space-y-2 mb-2">
              <li>При відмові до 27 березня 2026 року включно: повертається 90% від сплаченої суми. Утримана частка (10%) є сервісним збором, що покриває банківські комісії та витрати на реєстрацію.</li>
              <li>При відмові з 28 березня по 07 квітня 2026 року включно: повертається 50% від сплаченої суми.</li>
              <li>При відмові після 07 квітня 2026 року: повернення коштів не здійснюється, оскільки всі витрати на організацію участі Замовника є фактично понесеними та незворотними.</li>
            </ul>
            <p>4.2. Замовник може передати своє право участі іншій особі, повідомивши про це Виконавця не пізніше ніж за 48 годин до початку Заходу.</p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">5. ПЕРСОНАЛЬНІ ДАНІ</h3>
            <p>5.1. Здійснюючи оплату, Замовник надає згоду на збір та обробку персональних даних (ПІБ, телефон, область, назва церкви) для організації Заходу та додавання до чату конференції у Telegram.</p>
          </section>

          <section className="pt-6 border-t border-white/10">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">6. РЕКВІЗИТИ ВИКОНАВЦЯ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-white/40 uppercase mb-1">Виконавець</p>
                <p className="text-white font-bold">ФОП Марченко Віталій Романович</p>
              </div>
              <div>
                <p className="text-white/40 uppercase mb-1">ІПН</p>
                <p className="text-white font-bold">3340008753</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/40 uppercase mb-1">Адреса реєстрації</p>
                <p className="text-white font-bold">м. Запоріжжя, вул. Фортечна, 88/102</p>
              </div>
              <div>
                <p className="text-white/40 uppercase mb-1">Email</p>
                <p className="text-white font-bold">otvintarj@gmail.com</p>
              </div>
              <div>
                <p className="text-white/40 uppercase mb-1">Тел</p>
                <p className="text-white font-bold">+38 (093) 786-91-47</p>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="w-full text-center bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform">
            Повернутися на головну сторінку
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen relative">
        <div className="grain" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Countdown />
                <About />
                <Program />
                <Workshops />
                <Speakers />
                <Tickets />
              </>
            } />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-failure" element={<PaymentFailurePage />} />
            <Route path="/offer" element={<PublicOfferPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
