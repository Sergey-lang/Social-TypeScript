import s from './ProfileDescriptionForm.module.css'
import React from 'react'
import {ContactType, PhotosType, ProfileType} from '../../../../u4-redux/profile-reducer'
import {Button} from '../../../../u2-components/Button/Button'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {CreateField, Input, Textarea} from '../../../../u2-components/FormControl/FormControl'

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
       <form onSubmit={handleSubmit}>
          <Button>Save</Button>
          {error && <div className={s.error}>{error}</div>}
          <div className={s.description}>
             <div className={s.title}>
                Name:
             </div>
             <div className={s.inform}>
                {CreateField('Your name...', 'fullName', Input, [])}
             </div>
          </div>
          <div className={s.description}>
             <div className={s.title}>
                About me:
             </div>
             <div className={s.inform}>
                {CreateField('About me', 'aboutMe', Textarea, [])}
             </div>
          </div>
          <div className={s.description}>
             <div className={s.title}>
                Looking For A Job:
             </div>
             <div className={s.inform}>
                {CreateField('What are you looking for?', 'lookingForAJob', Input, [], {type: 'checkbox'})}
             </div>
          </div>
          <div className={s.description}>
             <div className={s.title}>
                Skills:
             </div>
             <div className={s.inform}>
                {CreateField('Skills...', 'lookingForAJobDescription', Input, [])}
             </div>
          </div>
          {
             Object.keys(profile.contacts).map((key, index) => {
                return <div className={s.description} key={index}>
                   <div className={s.title}>
                      {key}:
                   </div>
                   <div className={s.inform}>
                      {CreateField(key, 'contacts.' + key, Input, [])}
                   </div>
                </div>
             })
          }
       </form>
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
