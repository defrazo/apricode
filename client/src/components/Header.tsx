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
            <img src={Logo} alt="Логотип" className={styles["logo__image"]} />
            <span className={styles["logo__text"]}>ApriTask</span>
            <nav className={styles["nav-links"]}>
                <a href="#">Задачи</a>
                <a href="#">Заметки</a>
                <a href="#">Календарь</a>
                <a
                    href="#"
                    className={isSearchVisible ? styles["search-active"] : ""}
                    onClick={toggleSearchVisibility}
                >
                    Поиск
                </a>
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