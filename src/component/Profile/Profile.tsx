import {MyProfileInfo} from './MyProfileInfo/MyProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import React from 'react';
import {ProfileType} from '../../Redux/profile-reducer';

type ProfileProps = {
  profile: ProfileType | null
}

export const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <div className={s.app_wrapper_content}>
      <MyProfileInfo profile={props.profile}/>
      <MyPostsContainer/>
    </div>
  )
}
