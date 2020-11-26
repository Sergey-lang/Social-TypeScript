import React from 'react';
import s from './MyProfileInfo.module.css';
import avatar from '../../../assets/images/icons8_user.png';
import Sidebar from './Sidebar/Sidebar';
import {Preloader} from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';
import {Description} from '../../../common/Description/Description';
import {ProfileStatus} from './Status/ProfileStatus';

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
               <ProfileStatus status={status} updateOwnProfileStatus={updateOwnProfileStatus}/>
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
