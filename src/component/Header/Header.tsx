import React from 'react';
import style from './Header.module.css';

export const Header = () => {
    return (
        <header className={style.header}>
            <img src="https://img.icons8.com/carbon-copy/100/000000/minecraft-logo.png" />
            <div className={style.logo_name}>SW<span className={style.logo_explanation}>social network</span></div>
            <div className={style.login}>
                Login
            </div>
        </header>
    )
}
