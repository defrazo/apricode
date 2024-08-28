import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import About from './pages/About';
import './styles/index.scss';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'default'>('default');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'default' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle('light-theme', theme === 'light');

    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'default' ? 'light' : 'default';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <Router>
            <div className="layout">
                <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                <Routes>
                    <Route path="/" element={<Main searchTerm={searchTerm} />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer onThemeToggle={handleThemeToggle} />
            </div>
        </Router>
    );
};

export default App;