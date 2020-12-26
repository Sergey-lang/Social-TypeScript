import {MyProfileInfo} from './MyProfileInfo/MyProfileInfo'
import {MyPostsContainer} from './MyPosts/MyPostsContainer'
import s from './Profile.module.css'
import React from 'react'
import {ProfileType} from '../../u4-redux/profile-reducer'

type ProfileProps = {
   profile: ProfileType | null
   status: string
   isOwner:boolean
   updateOwnProfileStatus: (status: string) => void
   savePhoto: (photo:  File) => void
}

export const Profile: React.FC<ProfileProps> = (props) => {
   return (
       <div className={s.mainProfileWrapper}>
          <MyProfileInfo profile={props.profile}
                         status={props.status}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         updateOwnProfileStatus={props.updateOwnProfileStatus}
          />
          <MyPostsContainer/>
       </div>
   )
}
