import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

export const Navbar: React.FC = () => {
   return (
       <div className={s.navbar_wrapper}>
          <div className={s.link_wrapper}>
             <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
          </div>
          <div className={s.link_wrapper}>
             <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
          </div>
          <div className={s.link_wrapper}>
             <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
          </div>
          <div className={s.link_wrapper}>
             <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
          </div>
       </div>
   )
}
