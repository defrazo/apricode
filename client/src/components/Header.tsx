import React, { useState } from 'react';
import Logo from "/logo.png";
import styles from './Header.module.scss';

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

    const toggleSearchVisibility = () => {
        setIsSearchVisible(prevState => !prevState);
    };

    return (
        <header className={styles["header-container"]}>
            <a href="#/">
                <img src={Logo} alt="Логотип" className={styles["logo__image"]} />
                <span className={styles["logo__text"]}>ApriTask</span>
            </a>
            <nav className={styles["nav-links"]}>
                <a href="#/">Главная</a>
                <a href="#/about">О приложении</a>
                <span className={isSearchVisible ? styles["search-active"] : styles["search"]} onClick={toggleSearchVisibility}>Поиск</span>
            </nav>
            {isSearchVisible && (
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Поиск по задачам..."
                    className={styles['search-input']}
                />
            )}
        </header>
    );
};

export default Header;