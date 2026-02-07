import React, { useState, useEffect } from 'react';
import privacyEn from '../locales/privacy-en.json';
import privacyTr from '../locales/privacy-tr.json';
import privacyIt from '../locales/privacy-it.json';
import privacyRu from '../locales/privacy-ru.json';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
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

  const translations = { en: privacyEn, tr: privacyTr, it: privacyIt, ru: privacyRu };
  const content = translations[language]?.privacy;

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
              <p>{section.content.split('\n\n').map((para, idx) => (
                <span key={idx}>{para}<br /><br /></span>
              ))}</p>
            )}

            {section.intro && <p>{section.intro}</p>}

            {section['2-1'] && (
              <div>
                <h3>{section['2-1'].subheading}</h3>
                <ul>
                  {section['2-1'].items.map((item, idx) => (
                    <li key={idx}><strong>{item.title}</strong> {item.desc}</li>
                  ))}
                </ul>
              </div>
            )}

            {section['2-2'] && (
              <div>
                <h3>{section['2-2'].subheading}</h3>
                <ul>
                  {section['2-2'].items.map((item, idx) => (
                    <li key={idx}><strong>{item.title}</strong> {item.desc}</li>
                  ))}
                </ul>
              </div>
            )}

            {section.items && !section['2-1'] && !section['2-2'] && (
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    {typeof item === 'string' ? (
                      item
                    ) : (
                      <>
                        <strong>{item.title}</strong> {item.desc}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {section.supportServer && (
              <p><strong>{language === 'en' ? 'Discord Support Server:' : 'Discord Destek Sunucusu:'}</strong> <a href={section.supportServer.split(': ')[1]} target="_blank" rel="noopener noreferrer">{section.supportServer.split(': ')[1]}</a></p>
            )}

            {section.outro && (
              <p>{section.outro}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
