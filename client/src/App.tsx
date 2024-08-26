import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './styles/index.scss';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <div className="layout">
            <Header
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
            />
            <Main
                searchTerm={searchTerm}
            />
            <Footer />
        </div>
    );
};

export default App;