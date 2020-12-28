import React from 'react'
import {ContactType, ProfileType} from '../../../../u4-redux/profile-reducer'
import {Button} from '../../../../u2-components/Button/Button'
import {Contact} from './Contact'

import s from './ProfileDescription.module.css'

export type ProfilePropsType = {
   profile: ProfileType
   editMode: (value: boolean) => void
   isOwner: boolean
}

export const ProfileDescription: React.FC<ProfilePropsType> =
    ({profile, editMode, isOwner}) => {

       return (
           <>
              {
                 isOwner && <Button onClick={() => editMode(true)}>Edit mode</Button>
              }
              <div className={s.description}>
                 <div className={s.title}>
                    Name:
                 </div>
                 <div className={s.inform}>
                    {profile.fullName}
                 </div>
              </div>
              <div className={s.description}>
                 <div className={s.title}>
                    About me:
                 </div>
                 <div className={s.inform}>
                    {profile.aboutMe}
                 </div>
              </div>
              <div className={s.description}>
                 <div className={s.title}>
                    Looking For AJob:
                 </div>
                 <div className={s.inform}>
                    {profile.lookingForAJob ? 'Yes' : 'No'}
                 </div>
              </div>
              {
                 profile.lookingForAJob &&
                 <div className={s.description}>
                    <div className={s.title}>
                       Skills:
                    </div>
                    <div className={s.inform}>
                       {profile.lookingForAJobDescription}
                    </div>
                 </div>
              }
              {
                 Object.keys(profile.contacts).map((key, index) => {
                    return <Contact key={index}
                                    contactTitle={key}
                        //We can cast the key argument to be of keyof Person to ensure TypeScript understands                             what we’re aiming for. [key as keyof ContactType]
                                    contactValue={profile.contacts[key as keyof ContactType]}/>
                 })
              }
           </>
       )
    }


