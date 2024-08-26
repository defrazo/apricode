import React from 'react';
import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
    <footer className={styles["footer-container"]}>
        <p>© 2024 ApriTask Manager</p>
    </footer>
);

export default Footer;