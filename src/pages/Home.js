import React, { useState, useEffect } from 'react';
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import it from '../locales/it.json';
import ru from '../locales/ru.json';
import './Home.css';

const HelpIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4M12 8h.01"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AlertIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const PartyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1z"></path>
    <path d="M6 10h12M6 14h12"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const GlobeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
  </svg>
);

const Home = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  
  const translations = { en, tr, it, ru };
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const commands = [
    { name: '/help', key: 'help', icon: HelpIcon },
    { name: '/help-moderation', key: 'moderation', icon: ShieldIcon },
    { name: '/help-antiraid', key: 'antiraid', icon: AlertIcon },
    { name: '/help-fun', key: 'fun', icon: PartyIcon },
    { name: '/help-user', key: 'user', icon: UserIcon },
    { name: '/language', key: 'language', icon: GlobeIcon },
    { name: '/dashboard', key: 'dashboard', icon: SettingsIcon }
  ];

  return (
    <div className="home">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <img src="https://i.imgur.com/4pvCdOF.png" alt="Rynetic Logo" className="logo" />
          <h1 className="title">{t.home.title}</h1>
          <p className="subtitle">{t.home.subtitle}</p>
          <p className="description">{t.home.description}</p>
          
          <div className="buttons">
            <a href="https://dsc.gg/rynetic" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.home.addButton}
            </a>
            <a href="https://top.gg/bot/1373354613725728909/vote" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              {t.home.voteButton}
            </a>
          </div>
        </div>
      </header>

      {/* Commands Section */}
      <section className="commands-section">
        <div className="container">
          <h2 className="section-title">{t.home.commands}</h2>
          <div className="commands-list">
            {commands.map((cmd) => {
              const IconComponent = cmd.icon;
              return (
                <div key={cmd.key} className="command-item">
                  <div className="command-item-icon">
                    <IconComponent />
                  </div>
                  <div className="command-item-content">
                    <h3 className="command-item-name">{cmd.name}</h3>
                    <p className="command-item-description">{t.home[`${cmd.key}Description`]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{t.home.footer}</p>
      </footer>
    </div>
  );
};

export default Home;
