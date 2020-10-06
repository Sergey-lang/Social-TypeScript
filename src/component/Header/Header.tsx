import React from 'react';
import style from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <div className={style.logo_name}>SW<span className={style.logo_explanation}>social network</span></div>
            <div className={style.login}>
                Login
            </div>
        </header>
    )
}
