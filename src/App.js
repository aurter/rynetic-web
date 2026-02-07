import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const resolvePath = (pathname) => {
      if (!pathname || pathname === '/') return 'home';
      const p = pathname.toLowerCase();
      if (p.startsWith('/terms')) return 'terms';
      if (p.startsWith('/privacy-policy') || p.startsWith('/privacy') || p.startsWith('/policy')) return 'privacy';
      return 'home';
    };

    const setFromLocation = () => setCurrentPage(resolvePath(window.location.pathname));
    setFromLocation();

    const handlePop = () => setFromLocation();
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
