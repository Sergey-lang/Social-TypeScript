import React from 'react';
import s from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={s.header}>
          <div className={s.container}>
            <div className={s.logo_name}>SW<span className={s.logo_explanation}>social network</span></div>
            <div className={s.login}>
              Login
            </div>
          </div>
        </header>
    )
}
