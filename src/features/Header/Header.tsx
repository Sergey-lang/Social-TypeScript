import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {Button} from '../../common/Button/Button';

type HeaderPropsType = {
   isAuth: boolean
   login: string | null
   logout: () => void
}

export const Header: React.FC<HeaderPropsType> = (props) => {
   return (
      <header className={s.header}>
         <div className={s.container}>
            <div className={s.logo_name}>
               SW<span className={s.logo_explanation}>social network</span>
            </div>
            <div className={s.user_login}>
               {props.isAuth
                  ? <div className={s.loginBtnWrapper}>
                     <div className={s.login}>{props.login}</div>
                     <Button onClick={props.logout} className={s.logBtn}>logout</Button>
                  </div>
                  : <NavLink to={'/login'} className={s.login}>Login</NavLink>}
            </div>
         </div>
      </header>
   )
}
