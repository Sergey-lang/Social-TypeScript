import React, {useState} from 'react'
import avatar from '../../../u1-assets/images/icons8_user.png'
import Sidebar from './Sidebar/Sidebar'
import {Preloader} from '../../../u2-components/Preloader/Preloader'
import {ProfileType} from '../../../u4-redux/profile-reducer'
import {ProfileDescription} from './ProfileDescription/ProfileDescription'
import {ProfileStatusWithHooks} from './Status/NewProfileStatus'
import {ProfileDescriptionForm, ProfileFormType} from './ProfileDescriptionForm/ProfileDescriptionForm'

import s from './MyProfileInfo.module.css'

type MyProfileInfoType = {
   profile: ProfileType | null
   sidebar?: any
   status: string
   isOwner: boolean
   updateOwnProfileStatus: (status: string) => void
   savePhoto: (photo: File) => void
   saveProfileData: (profile: ProfileType) => any
}//sidebar will be do

export const MyProfileInfo: React.FC<MyProfileInfoType> = (
    {
       profile,
       sidebar,
       status,
       savePhoto,
       isOwner,
       saveProfileData,
       updateOwnProfileStatus
    }) => {

   const [editMode, setEditMode] = useState<boolean>(false)

   const mainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null && e.target.files.length) {
         savePhoto(e.target.files[0])
      }
   }

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
       <div className={s.profile_wrapper}>
          <div className={s.left_block}>
             <div className={s.profile_photo}>
                <img alt='avatar' src={profile.photos.large || avatar}/>
             </div>
             {isOwner && <input type={'file'} onChange={mainPhotoSelect}/>}
             <Sidebar sidebar={sidebar}/>
          </div>

          <div className={s.profile_info}>
             <div className={s.user_name}>{profile.fullName}</div>
             <div className={s.status}>
                <ProfileStatusWithHooks status={status} updateOwnProfileStatus={updateOwnProfileStatus}/>
             </div>
             <div className={s.descriptions_wrapper}>
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
          </div>
       </div>
   )
}
