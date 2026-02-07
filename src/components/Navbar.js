import React, { useState } from 'react';
import './Navbar.css';

const LanguageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Navbar = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleNavClick = (page, path = '/') => {
    // push new history entry so direct URLs work and back/forward behaves
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLanguageOpen(false);
    // Notify parent component or trigger re-render
    const event = new CustomEvent('languageChanged', { detail: lang });
    window.dispatchEvent(event);
  };

  const languageNames = {
    en: 'English',
    tr: 'Türkçe',
    it: 'Italiano',
    ru: 'Русский'
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button 
          className="navbar-logo"
          onClick={() => handleNavClick('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img src="https://i.imgur.com/4pvCdOF.png" alt="Rynetic" className="navbar-logo-img" />
          <span>Rynetic</span>
        </button>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <button 
              className="navbar-link"
              onClick={() => handleNavClick('home', '/')}
            >
              Home
            </button>
          </li>
          <li className="navbar-item">
            <a href="https://discord.gg/UcvuXJvnCg" target="_blank" rel="noopener noreferrer" className="navbar-link">Support</a>
          </li>
          <li className="navbar-item">
            <a
              href="/privacy-policy"
              className="navbar-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('privacy', '/privacy-policy'); }}
            >
              Privacy
            </a>
          </li>
          <li className="navbar-item">
            <a
              href="/terms"
              className="navbar-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('terms', '/terms'); }}
            >
              Terms
            </a>
          </li>
          <li className="navbar-item language-selector-item">
            <button 
              className="navbar-link language-toggle"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span>{languageNames[language]}</span>
              <LanguageIcon />
            </button>
            {isLanguageOpen && (
              <div className="language-dropdown">
                <button 
                  className={`language-option ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </button>
                <button 
                  className={`language-option ${language === 'tr' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('tr')}
                >
                  Türkçe
                </button>
                <button 
                  className={`language-option ${language === 'it' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('it')}
                >
                  Italiano
                </button>
                <button 
                  className={`language-option ${language === 'ru' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('ru')}
                >
                  Русский
                </button>
              </div>
            )}
          </li>
          <li className="navbar-item">
            <a href="https://dsc.gg/rynetic" target="_blank" rel="noopener noreferrer" className="navbar-link navbar-invite">Add Bot</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
