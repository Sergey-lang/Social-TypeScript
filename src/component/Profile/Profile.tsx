import {MyProfileInfo} from './MyProfileInfo/MyProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import React from 'react';
import {ProfileType} from '../../Redux/profile-reducer';

type ProfileProps = {
   profile: ProfileType | null
   status: string
   updateOwnProfileStatus: (status: string) => void
}

export const Profile: React.FC<ProfileProps> = (props) => {
   return (
      <div className={s.mainProfileWrapper}>
         <MyProfileInfo profile={props.profile}
                        status={props.status}
                        updateOwnProfileStatus={props.updateOwnProfileStatus}
         />
         <MyPostsContainer/>
      </div>
   )
}
