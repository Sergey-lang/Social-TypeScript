import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {Info} from '../../../../u2-components/Info/Info'
import {Button} from '../../../../u2-components/Button/Button'
import {ProfileBlock} from '../../../../u2-components/ProfileBlock/ProfileBlock'
import {ContactType, PhotosType, ProfileType} from '../../../../u4-redux/profile-reducer'
import {CreateField, Input, Textarea} from '../../../../u2-components/FormControl/FormControl'

import s from './ProfileDescriptionForm.module.scss'

type ProfileDescriptionFormOwnProps = {
   profile: ProfileType
   initialValues: any
}

export const ProfileForm: React.FC<InjectedFormProps<ProfileFormType,
    ProfileDescriptionFormOwnProps> & ProfileDescriptionFormOwnProps>
    = ({
          handleSubmit,
          profile,
          error,
       }) => {

   return (
       <ProfileBlock title='Personal info'>
          <form onSubmit={handleSubmit}>
             <Info name='Name' className={s.input}>
                {CreateField('Your name...', 'fullName', Input, [])}
             </Info>
             <Info name='About me' className={s.textArea}>
                {CreateField('About me', 'aboutMe', Textarea, [])}
             </Info>
             <Info name='Looking for a job' className={s.checkbox}>
                {CreateField('What are you looking for?', 'lookingForAJob', Input, [], {type: 'checkbox'})}
             </Info>
             <Info name='Skills' className={s.input}>
                {CreateField('Skills...', 'lookingForAJobDescription', Input, [])}
             </Info>
             {
                Object.keys(profile.contacts).map((key, index) => {
                   return <Info name={key}
                                className={s.input}
                                key={index}>
                      {CreateField(key, 'contacts.' + key, Input, [])}
                   </Info>
                })
             }
             {error && <div className={s.error}>{error}</div>}
             <div className={s.btnWrapper}>
                <Button>Save</Button>
             </div>
          </form>
       </ProfileBlock>
   )
}

// We can cast the key argument to be of keyof Person to ensure TypeScript understands what we’re aiming for.
// [key as keyofContactType]
// contactValue={profile.contacts[key as keyof ContactType]}/>

export const ProfileDescriptionForm = reduxForm<ProfileFormType, ProfileDescriptionFormOwnProps>({form: 'profile-data'})(ProfileForm)

//dada from form = form name = ProfileType obj.
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
