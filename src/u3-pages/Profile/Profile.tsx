import React, {useState} from 'react'
import {ProfileType} from '../../u4-redux/profile-reducer'
import {MyPostsContainer} from './MyPosts/MyPostsContainer'
import {Preloader} from '../../u2-components/Preloader/Preloader'
import {PersonalInfo} from '../../u2-components/PersonalInfo/PersonalInfo'
import {ProfileStatusWithHooks} from './MyProfileInfo/Status/NewProfileStatus'
import {ProfileDescription} from './MyProfileInfo/ProfileDescription/ProfileDescription'

import s from './Profile.module.scss'
import {ProfileDescriptionForm, ProfileFormType} from './MyProfileInfo/ProfileDescriptionForm/ProfileDescriptionForm'

type ProfileProps = {
   profile: ProfileType | null
   status: string
   isOwner: boolean
   updateOwnProfileStatus: (status: string) => void
   savePhoto: (photo: File) => void
   saveProfileData: (profile: ProfileType) => any//check his value
}

export const Profile: React.FC<ProfileProps> = (
    {profile, status, isOwner, updateOwnProfileStatus, savePhoto, saveProfileData}) => {

   const [editMode, setEditMode] = useState<boolean>(false)

   // const mainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    if (e.target.files !== null && e.target.files.length) {
   //       savePhoto(e.target.files[0])
   //    }
   // }

   if (!profile) {
      return <Preloader/>
   }

   const onSubmit = (formData: ProfileFormType) => {
      saveProfileData(formData).then(
          () => setEditMode(false)
      )
      // console.log(formData)
   }


   return (
       <div className={s.profilePage}>
          <div className={s.leftBlock}>
             <PersonalInfo title='Status'>
                <ProfileStatusWithHooks status={status} updateOwnProfileStatus={updateOwnProfileStatus}/>
             </PersonalInfo>
             {
                !editMode
                    ? <ProfileDescription profile={profile}
                                          editMode={setEditMode}
                                          isOwner={isOwner}/>
                    : <ProfileDescriptionForm profile={profile}
                                              initialValues={profile}
                                              onSubmit={onSubmit}/>
             }

          </div>
          <MyPostsContainer/>
       </div>
       // <div className={s.mainProfileWrapper}>
       //    <MyProfileInfo profile={props.profile}
       //                   status={props.status}
       //                   isOwner={props.isOwner}
       //                   savePhoto={props.savePhoto}
       //                   saveProfileData={props.saveProfileData}
       //                   updateOwnProfileStatus={props.updateOwnProfileStatus}
       //    />
       //
       // </div>
   )
}