import React from 'react';
import style from './Navbar.module.css'

function Navbar() {
    return (
        <div className={style.navbar_wrapper}>
            <div className={style.link_wrapper}>
                <a href="#">Profile</a>
            </div>
            <div className={style.link_wrapper}>
                <a href="#">News</a>
            </div>
            <div className={style.link_wrapper}>
                <a href="#">Messages</a>
            </div>
            <div className={style.link_wrapper}>
                <a href="#">Users</a>
            </div>
        </div>
    )
}

export default Navbar;