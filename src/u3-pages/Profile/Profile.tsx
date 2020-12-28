import {MyProfileInfo} from './MyProfileInfo/MyProfileInfo'
import {MyPostsContainer} from './MyPosts/MyPostsContainer'
import React from 'react'
import {ProfileType} from '../../u4-redux/profile-reducer'

import s from './Profile.module.css'

type ProfileProps = {
   profile: ProfileType | null
   status: string
   isOwner:boolean
   updateOwnProfileStatus: (status: string) => void
   savePhoto: (photo:  File) => void
   saveProfileData: (profile:  ProfileType) => void
}

export const Profile: React.FC<ProfileProps> = (props) => {
   return (
       <div className={s.mainProfileWrapper}>
          <MyProfileInfo profile={props.profile}
                         status={props.status}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfileData={props.saveProfileData}
                         updateOwnProfileStatus={props.updateOwnProfileStatus}
          />
          <MyPostsContainer/>
       </div>
   )
}
