import React from 'react'
import {Info} from '../../../../u2-components/Info/Info'
import {Button} from '../../../../u2-components/Button/Button'
import {ContactType, ProfileType} from '../../../../u4-redux/profile-reducer'
import {PersonalInfo} from '../../../../u2-components/PersonalInfo/PersonalInfo'

import s from './ProfileDescription.module.css'

export type ProfileProps = {
   profile: ProfileType
   editMode: (value: boolean) => void
   isOwner: boolean
}

export const ProfileDescription: React.FC<ProfileProps> =
    ({profile, editMode, isOwner}) => {

       return (
           <>
              <PersonalInfo title='Personal info'>
                 <Info name='Name' description={profile && profile.fullName}/>
                 <Info name='About me' description={profile && profile.aboutMe}/>
                 <Info name='Looking for a job' description={profile && profile.lookingForAJob}/>
                 <Info name='Skills' description='ReactJS'/>
                 {
                    Object.keys(profile.contacts).map((key, index) => {
                       return <Info key={index}
                                    name={key}
                           //We can cast the key argument to be of keyof Person to ensure TypeScript understands                             what we’re aiming for. [key as keyof ContactType]
                                    description={profile.contacts[key as keyof ContactType]}/>
                    })
                 }
                 <div className={s.btnWrapper}>
                    <Button white onClick={() => {
                       editMode(true)}}>Edit</Button>
                 </div>
              </PersonalInfo>
           </>
       )
    }


