import React from 'react';
import style from './Navbar.module.css'
import {NavLink} from 'react-router-dom';

export function Navbar() {
    return (
        <div className={style.navbar_wrapper}>
            <div className={style.link_wrapper}>
                <NavLink to="/profile" activeClassName={style.activeLink}>Profile</NavLink>
            </div>
            <div className={style.link_wrapper}>
                <NavLink to="/news" activeClassName={style.activeLink}>News</NavLink>
            </div>
            <div className={style.link_wrapper}>
                <NavLink to="/dialogs" activeClassName={style.activeLink}>Messages</NavLink>
            </div>
            <div className={style.link_wrapper}>
                <NavLink to="/users" activeClassName={style.activeLink}>Users</NavLink>
            </div>
        </div>
    )
}
