import React from 'react'
import s from './MyProfileInfo.module.css'
import avatar from '../../../u1-assets/images/icons8_user.png'
import Sidebar from './Sidebar/Sidebar'
import {Preloader} from '../../../u2-components/Preloader/Preloader'
import {ProfileType} from '../../../u4-redux/profile-reducer'
import {Description} from '../../../u2-components/Description/Description'
import {ProfileStatusWithHooks} from './Status/NewProfileStatus'

type MyProfileInfoType = {
   profile: ProfileType | null
   sidebar?: any
   status: string
   updateOwnProfileStatus: (status: string) => void
}//sidebar will be do

export const MyProfileInfo: React.FC<MyProfileInfoType> = (
    {
       profile,
       sidebar,
       status,
       updateOwnProfileStatus
    }) => {

   if (!profile) {
      return <Preloader/>
   }
   return (
       <div className={s.profile_wrapper}>
          <div className={s.left_block}>
             <div className={s.profile_photo}>
                <img alt='avatar' src={profile.photos.large ? profile.photos.large! : avatar}/>
             </div>
             <Sidebar sidebar={sidebar}/>
          </div>

          <div className={s.profile_info}>
             <div className={s.user_name}>{profile.fullName}</div>
             <div className={s.status}>
                <ProfileStatusWithHooks status={status} updateOwnProfileStatus={updateOwnProfileStatus}/>
             </div>
             <div className={s.descriptions_wrapper}>
                <Description aboutMe={profile.aboutMe}
                             contacts={profile.contacts}
                             lookingForAJob={profile.lookingForAJob}
                             lookingForAJobDescription={profile.lookingForAJobDescription}/>
             </div>
          </div>
       </div>
   )
}
