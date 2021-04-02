import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {Info} from '../../../../components/Info/Info'
import {Button} from '../../../../components/Button/Button'
import {ContactType, PhotosType, ProfileType} from '../../../../redux/profile-reducer'
import {createField, GetStringKeys, Input, Textarea} from '../../../../components/FormControl/FormControl'

import s from './ProfileDescriptionForm.module.scss'

type ProfileDescriptionFormOwnProps = {
   profile: ProfileType
   // initialValues: any
}

type ProfileDescriptionFormOwnPropsKeys = GetStringKeys<ProfileType>

export const ProfileForm: React.FC<InjectedFormProps<ProfileFormType,
    ProfileDescriptionFormOwnProps> & ProfileDescriptionFormOwnProps>
    = ({
          handleSubmit,
          profile,
          error,
       }) => {

   const mappedField = Object.keys(profile.contacts).map((key, index) =>
       <Info name={key}
             className={s.wrapper}
             key={index}>
          {/*todo:create some solution for object*/}
          {createField(key, 'contacts.' + key, Input, [])}
       </Info>
   )

   return (
       <div className={s.sidebar}>
          <div className={s.central}>
                <span className={s.personal}>
                   Personal Info Edit
                </span>
             <form className={s.editProfileForm} onSubmit={handleSubmit}>
                <Info name='Name' className={s.wrapper}>
                   {createField<ProfileDescriptionFormOwnPropsKeys>('Your name...', 'fullName', Input, [])}
                </Info>
                <Info name='About me' className={s.textArea}>
                   {createField<ProfileDescriptionFormOwnPropsKeys>('About me', 'aboutMe', Textarea, [])}
                </Info>
                <Info name='Looking for a job' className={s.checkbox}>
                   {createField<ProfileDescriptionFormOwnPropsKeys>('What are you looking for?', 'lookingForAJob', Input, [], {type: 'checkbox'})}
                </Info>
                <Info name='Skills' className={s.wrapper}>
                   {createField<ProfileDescriptionFormOwnPropsKeys>('Skills...', 'lookingForAJobDescription', Input, [])}
                </Info>
                {/*nextFields*/}
                {
                   mappedField
                }
                {error && <div className={s.error}>{error}</div>}
                <div className={s.btnWrapper}>
                   <Button>Save</Button>
                </div>
             </form>
          </div>
       </div>
   )
}

// We can cast the key argument to be of keyof Person to ensure TypeScript understands what we’re aiming for.
// [key as keyofContactType]
// contactValue={profile.contacts[key as keyof ContactType]}/>

export const ProfileDescriptionForm = reduxForm<ProfileFormType, ProfileDescriptionFormOwnProps>({form: 'profile-data'})(ProfileForm)

//data from form = form name = ProfileType obj.
export type ProfileFormType = {
   userId: number
   lookingForAJob: boolean
   lookingForAJobDescription: string
   fullName: string
   contacts: ContactType
   aboutMe: string
   photos: PhotosType
}

type OwnProps = {}
