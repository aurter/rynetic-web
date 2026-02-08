import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');

  const languages = {
    en: 'English',
    tr: 'Türkçe',
    it: 'Italiano',
    ru: 'Русский'
  };

  const handleLanguageChange = (lang) => {
    localStorage.setItem('language', lang);
    setCurrentLanguage(lang);
    setLanguageDropdown(false);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  const handleNavigation = (path) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new CustomEvent('pathchange'));
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          Rynetic
        </a>

        {/* Menu Button */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}>
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/dashboard" className="navbar-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/dashboard');
            }}>
              Dashboard
            </a>
          </li>
          <li className="navbar-item">
            <a href="https://dsc.gg/rynetic" target="_blank" rel="noopener noreferrer" className="navbar-link" onClick={() => setIsOpen(false)}>
              Support
            </a>
          </li>
          <li className="navbar-item">
            <a href="/privacy-policy" className="navbar-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/privacy-policy');
            }}>
              Privacy
            </a>
          </li>
          <li className="navbar-item">
            <a href="/terms" className="navbar-link" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/terms');
            }}>
              Terms
            </a>
          </li>
          <li className="navbar-item language-selector-item">
            <button 
              className="navbar-link language-toggle"
              onClick={() => setLanguageDropdown(!languageDropdown)}
              aria-label="Select language"
            >
              <span>{currentLanguage.toUpperCase()}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {languageDropdown && (
              <div className="language-dropdown">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    className={`language-option ${code === currentLanguage ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(code)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
