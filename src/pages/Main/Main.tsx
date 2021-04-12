import React from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {savePhoto} from '../../redux/profile-reducer'
import undefinedUserImg from '../../assets/images/users/no-image-100.png'
import s from './Main.module.scss'
import {path} from '../../app/App';
import {AppStateType} from '../../app/store';

export const Main = () => {

   const dispatch = useDispatch()

   const mainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null && e.target.files.length) {
         dispatch(savePhoto(e.target.files[0]))
      }
   }

   const largeProfileImg = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.photos.large)

   const userName = useSelector<AppStateType, string | null | undefined>(state => state.profileState.profile?.fullName)

   //get id for editPhoto, show or hide input file
   const profileId = useSelector<AppStateType, number | any>(state => state.profileState.profile?.userId)
   const authId = useSelector<AppStateType, number | any>(state => state.authState.id)
   //edit mode = isOwner
   const isOwner = profileId === authId ? true : false //compare id from profile and auth

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
                               <NavLink to={path.PROFILE} activeClassName={s.active}>Profile</NavLink>
                            </li>
                            <li>
                               <NavLink to={path.DIALOGS} activeClassName={s.active}>Dialogs</NavLink>
                            </li>
                            <li>
                               <NavLink to={path.CHAT}  activeClassName={s.active}>Chat</NavLink>
                            </li>
                            <li>
                               <NavLink to={path.DEVELOPERS}  activeClassName={s.active}>Developers</NavLink>
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
