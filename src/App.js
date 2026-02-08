import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Navbar from './components/Navbar';
import './App.css';

function App() {
	const [page, setPage] = useState('home');

	const updatePageFromPath = () => {
		const path = window.location.pathname.replace(/^\//, '') || 'home';
		if (path === 'privacy-policy') setPage('privacy');
		else if (path === 'terms') setPage('terms');
		else if (path === 'dashboard') setPage('dashboard');
		else setPage('home');
	};

	useEffect(() => {
		updatePageFromPath();
	}, []);

	useEffect(() => {
		const handlePopState = () => {
			updatePageFromPath();
		};

		const handlePathChange = () => {
			updatePageFromPath();
		};

		window.addEventListener('popstate', handlePopState);
		window.addEventListener('pathchange', handlePathChange);
		return () => {
			window.removeEventListener('popstate', handlePopState);
			window.removeEventListener('pathchange', handlePathChange);
		};
	}, []);

	const renderPage = () => {
		switch (page) {
			case 'dashboard':
				return <Dashboard />;
			case 'privacy':
				return <PrivacyPolicy />;
			case 'terms':
				return <TermsOfService />;
			default:
				return <Home />;
		}
	};

	return (
		<div className="app-root">
			<Navbar />
			<main>{renderPage()}</main>
		</div>
	);
}

export default App;
