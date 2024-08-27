import React from 'react';
import Toogle from '../assets/img/toogle.png'
import styles from "./Footer.module.scss";

interface FooterProps {
    onThemeToggle: () => void;
}

const Footer: React.FC<FooterProps> = ({ onThemeToggle }) => (
    <footer className={styles["footer-container"]}>
        <p>© 2024 ApriTask Manager</p>
        <img className={styles["toogle"]} src={Toogle} alt="Ночной/Дневной режим" onClick={onThemeToggle} />
    </footer>
);

export default Footer;