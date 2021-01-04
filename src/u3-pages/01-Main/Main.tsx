import React from 'react'

import s from './Main.module.scss'
import undefinedUserImg from './../../u1-assets/images/header/question-mark-128.png'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../u4-redux/store'
import {savePhoto} from '../../u4-redux/profile-reducer'

export const Main = () => {

   const dispatch = useDispatch()

   const mainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null && e.target.files.length) {
         dispatch(savePhoto(e.target.files[0]))
      }
   }

   const largeProfileImg = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.photos.large)

   const userName = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.fullName)
   const isOwner = true

   return (
       <div className={s.mainBlockWrapper}>
          <div className={s.gap}>
             <div className={s.row}>
                <div className={s.userProfile}>
                   <div className={s.mainBg}>
                      <div className={s.profileAuthor}>
                         <div className={s.profileImgBlock}>
                            <img className={s.mainAuthorImg} src={largeProfileImg ? largeProfileImg : undefinedUserImg}
                                 alt="author"/>
                            {
                               isOwner &&
                               <div className={s.imageUpload}>
                                  <label className={s.inputLabel}>
                                     <input className={s.photoLoad} type="file" onChange={mainPhotoSelect}/>
                                  </label>
                               </div>
                            }
                         </div>
                      </div>
                   </div>
                   <div className={s.profileNavSection}>
                      <div className={s.navTabs}>
                         <div className={s.shortAuthorInfo}>
                            <div className={s.userName}>{userName}</div>
                            <div className={s.country}>Minsk, BY</div>
                         </div>
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
       </div>
   )
}