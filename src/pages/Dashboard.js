import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const SettingsIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
  </svg>
);

const Dashboard = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const dashboardTexts = {
    en: {
      title: "Dashboard",
      subtitle: "Server Management",
      description: "Use the /dashboard command in your Discord server to access the web dashboard and manage all bot settings.",
      commandText: "Use this command in Discord:",
      instructionsTitle: "How to access:",
      instructions: [
        "Open your Discord server",
        "Type /dashboard in any channel",
        "Press Enter",
        "Manage your server settings"
      ],
      featureTitle: "Dashboard Features",
      features: [
        "Server statistics and analytics",
        "Bot configuration and settings",
        "Moderation tools and logs",
        "Role management",
        "Welcome messages setup",
        "Auto-moderation rules"
      ]
    },
    tr: {
      title: "Yönetim Paneli",
      subtitle: "Sunucu Yönetimi",
      description: "Discord sunucunuzda /dashboard komutunu kullanarak web yönetim paneline erişin ve tüm bot ayarlarını yönetin.",
      commandText: "Discord'da bu komutu kullanın:",
      instructionsTitle: "Nasıl erişilir:",
      instructions: [
        "Discord sunucunuzu açın",
        "Herhangi bir kanalda /dashboard yazın",
        "Enter tuşuna basın",
        "Sunucu ayarlarınızı yönetin"
      ],
      featureTitle: "Panel Özellikleri",
      features: [
        "Sunucu istatistikleri ve analitiği",
        "Bot yapılandırması ve ayarları",
        "Moderasyon araçları ve günlükleri",
        "Rol yönetimi",
        "Hoş geldin mesajları kurulumu",
        "Otomatik moderasyon kuralları"
      ]
    },
    it: {
      title: "Pannello di Controllo",
      subtitle: "Gestione del Server",
      description: "Usa il comando /dashboard nel tuo server Discord per accedere al pannello web e gestire tutte le impostazioni del bot.",
      commandText: "Usa questo comando in Discord:",
      instructionsTitle: "Come accedere:",
      instructions: [
        "Apri il tuo server Discord",
        "Digita /dashboard in qualsiasi canale",
        "Premi Invio",
        "Gestisci le impostazioni del tuo server"
      ],
      featureTitle: "Funzionalità del Pannello",
      features: [
        "Statistiche e analitiche del server",
        "Configurazione e impostazioni del bot",
        "Strumenti di moderazione e registri",
        "Gestione dei ruoli",
        "Configurazione messaggi di benvenuto",
        "Regole di moderazione automatica"
      ]
    },
    ru: {
      title: "Панель Управления",
      subtitle: "Управление Сервером",
      description: "Используйте команду /dashboard на вашем сервере Discord для доступа к веб-панели и управления всеми настройками бота.",
      commandText: "Используйте эту команду в Discord:",
      instructionsTitle: "Как получить доступ:",
      instructions: [
        "Откройте ваш сервер Discord",
        "Введите /dashboard в любой канал",
        "Нажмите Enter",
        "Управляйте настройками вашего сервера"
      ],
      featureTitle: "Функции Панели",
      features: [
        "Статистика и аналитика сервера",
        "Конфигурация и настройки бота",
        "Инструменты модерации и логи",
        "Управление ролями",
        "Установка приветственных сообщений",
        "Правила автоматической модерации"
      ]
    }
  };

  const content = dashboardTexts[language];

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        {/* Hero Section */}
        <section className="dashboard-hero">
          <div className="dashboard-hero-background">
            <div className="dashboard-gradient-orb orb-1"></div>
            <div className="dashboard-gradient-orb orb-2"></div>
          </div>

          <div className="dashboard-hero-content">
            <SettingsIcon />
            <h1 className="dashboard-title">{content.title}</h1>
            <p className="dashboard-subtitle">{content.subtitle}</p>
            <p className="dashboard-description">{content.description}</p>

            <div className="dashboard-command-box">
              <p className="command-label">{content.commandText}</p>
              <code className="command-code">/dashboard</code>
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="dashboard-instructions">
          <div className="instructions-container">
            <h2>{content.instructionsTitle}</h2>
            <div className="steps">
              {content.instructions.map((instruction, index) => (
                <div key={index} className="step">
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="dashboard-features">
          <div className="features-container">
            <h2>{content.featureTitle}</h2>
            <div className="features-list">
              {content.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
