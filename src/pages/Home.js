import React, { useState, useEffect } from 'react';
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import it from '../locales/it.json';
import ru from '../locales/ru.json';
import './Home.css';

const HelpIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4M12 8h.01"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AlertIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const PartyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1z"></path>
    <path d="M6 10h12M6 14h12"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const GlobeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SparkIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4m0 8v4M4.22 4.22l2.83 2.83m0 7.08l-2.83 2.83M20 4l-2.83 2.83m0 7.08l2.83 2.83"></path>
  </svg>
);

const RocketIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7"></path>
    <path d="M12 17v4"></path>
    <path d="M8 20h8"></path>
    <path d="M6 7l6-6 6 6"></path>
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

  const features = [
    { name: '/help', key: 'help', icon: HelpIcon },
    { name: '/help-moderation', key: 'moderation', icon: ShieldIcon },
    { name: '/help-antiraid', key: 'antiraid', icon: AlertIcon },
    { name: '/help-fun', key: 'fun', icon: PartyIcon },
    { name: '/help-user', key: 'user', icon: UserIcon },
    { name: '/language', key: 'language', icon: GlobeIcon }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <SparkIcon />
            <span>{t.home.badgeText}</span>
          </div>
          
          <h1 className="hero-title">Rynetic</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
          <p className="hero-description">{t.home.description}</p>
          
          <div className="hero-buttons">
            <a href="https://dsc.gg/rynetic" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.home.addButton}
            </a>
            <a href="https://top.gg/bot/1373354613725728909/vote" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              {t.home.voteButton}
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <div className="section-header">
            <h2>{t.home.commands}</h2>
            <p>{t.home.featuresSubtitle}</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.key} className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon">
                      <IconComponent />
                    </div>
                  </div>
                  <h3 className="feature-name">{feature.name}</h3>
                  <p className="feature-description">{t.home[`${feature.key}Description`]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{t.home.statsNumber1}</div>
            <div className="stat-label">{t.home.statsLabel1}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{t.home.statsNumber2}</div>
            <div className="stat-label">{t.home.statsLabel2}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{t.home.statsNumber3}</div>
            <div className="stat-label">{t.home.statsLabel3}</div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <RocketIcon />
          <h2>{t.home.ctaTitle}</h2>
          <p>{t.home.ctaDescription}</p>
          <a href="https://dsc.gg/rynetic" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
            {t.home.addButton}
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>{t.home.footer}</p>
      </footer>
    </div>
  );
};

export default Home;
