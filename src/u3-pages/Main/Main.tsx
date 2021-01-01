import React from 'react'

import s from './Main.module.scss'
import mainBgImg from './../../u1-assets/images/main.jpg'
import undefinedUserImg from './../../u1-assets/images/header/question-mark-128.png'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../u4-redux/store'

export const Main = () => {

   const largeProfileImg = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.photos.large)

   const userName = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.fullName)

   return (
       <section>
          <div className={s.gap}>
             <div className={s.row}>
                <div className={s.userProfile}>
                   <figure>
                      <img src={mainBgImg} alt="mainBackground"/>
                   </figure>
                   <div className={s.profileSection}>
                      <div className={s.profileAuthor}>
                         <div className={s.profileImg}>
                            <img src={largeProfileImg ? largeProfileImg : undefinedUserImg} alt="author"/>
                         </div>
                         <div className={s.authorContent}>
                            <a href="#">
                               {userName}
                            </a>
                            <div className={s.country}>Minsk, BY</div>
                         </div>
                      </div>
                      <div className={s.navTabs}>
                         <ul className={s.navLinks}>
                            <li className={s.active}>
                               <NavLink to="/profile" activeClassName={s.active}>About</NavLink>
                            </li>
                            <li>
                               <NavLink to="/followers" activeClassName={s.active}>Followers</NavLink>
                            </li>
                            <li>
                               <NavLink to="/follow" activeClassName={s.active}>Follow</NavLink>
                            </li>
                            <li>
                               <NavLink to="/dialogs" activeClassName={s.active}>Dialogs</NavLink>
                            </li>
                            <li>
                               <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>
   )
}