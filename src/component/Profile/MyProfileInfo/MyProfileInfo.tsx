import React from 'react';
import style from './MyProfileInfo.module.css';
import avatar from './../../../asets/images/avatar.jpg';
import Sidebar from './Sidebar/Sidebar';
import {Preloader} from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../Redux/profile-reducer';

type MyProfileInfoType = {
  profile: ProfileType | null
  sidebar?: any
}//sidebar will be do

export const MyProfileInfo: React.FC<MyProfileInfoType> = ({profile, sidebar}) => {
  if (!profile) {
    return <Preloader/>
  }
  return (
    <div className={style.profile_wrapper}>
      <div className={style.profile_photo}>
        <img alt={'avatar'} src={profile ? profile.photos.large! : ''}/>
      </div>
      <div className={style.profile_info}>
        <div className={style.user_name}>{profile.fullName}</div>
        <div className={style.status}>"Ученье свет, а за свет надо платить!"
        </div>
        <div className={style.descriptions_wrapper}>
          <div className={style.description}>About me: {profile.aboutMe}</div>
          <div className={style.description}>Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
          <div className={style.description}>{profile.contacts.github}</div>
        </div>
      </div>
      <Sidebar sidebar={sidebar}/>
    </div>
  )
}
