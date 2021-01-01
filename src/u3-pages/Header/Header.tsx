import React from 'react'
import s from './Header.module.scss'
import {NavLink, useLocation} from 'react-router-dom'

import logoImg from './../../u1-assets/images/logo.svg'
import undefinedUserImg from './../../u1-assets/images/header/question-mark-128.png'
import exit from './../../u1-assets/images/exit-100.png'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../u4-redux/store'

type HeaderPropsType = {
   isAuth: boolean
   login: string | null
   logout: () => void
}

export const Header: React.FC<HeaderPropsType> = (props) => {

   //get current url, rerender too much!!!
   const HeaderView = () => {
      return useLocation().pathname.substring(1)
   }

   const smallProfileImg = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.photos.small)

   return (
       <div className={s.topbar}>
          <div className={s.logo}>
             <a href="#">
                <img src={logoImg} alt="logo"/>
                <h4>SOCIAL LOGO</h4>
             </a>
          </div>
          <div className={s.topArea}>
             <div className={s.pageName}>
                <span>{HeaderView()}</span>
             </div>
             <div className={s.userImg}>
                {
                   props.isAuth
                       ? <>
                          <h5>{props.login}</h5>
                          <img src={smallProfileImg ? smallProfileImg : undefinedUserImg} alt="userPhoto"/>
                       </>
                       : <NavLink to={'/login'} className={s.login}>Login</NavLink>
                }
             </div>
             <span>
                {
                   props.isAuth
                   && <a href="#" onClick={props.logout}>
                      <img src={exit} alt="settings"/>
                   </a>
                }
             </span>
          </div>
       </div>
   )
}
