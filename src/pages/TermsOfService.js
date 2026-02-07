import React, { useState, useEffect } from 'react';
import termsEn from '../locales/terms-en.json';
import termsTr from '../locales/terms-tr.json';
import termsIt from '../locales/terms-it.json';
import termsRu from '../locales/terms-ru.json';
import './TermsOfService.css';

const TermsOfService = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const translations = { en: termsEn, tr: termsTr, it: termsIt, ru: termsRu };
  const content = translations[language]?.terms;

  if (!content) {
    return <div className="legal-page"><div className="legal-container"><p>Loading...</p></div></div>;
  }

  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>{content.title}</h1>
        <p className="last-updated">{content.lastUpdated}</p>

        {Object.entries(content.sections).map(([key, section]) => (
          <section key={key}>
            <h2>{section.heading}</h2>
            
            {section.content && (
              <p>{section.content}</p>
            )}

            {section.intro && <p>{section.intro}</p>}

            {section.items && (
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}

            {section.supportServer && (
              <p><a href={section.supportServer.split(': ')[1]} target="_blank" rel="noopener noreferrer">{section.supportServer}</a></p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default TermsOfService;
