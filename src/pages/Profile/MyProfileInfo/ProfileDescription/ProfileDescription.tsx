import React from 'react'
import {Info} from '../../../../components/Info/Info'
import {Button} from '../../../../components/Button/Button'
import {ContactType, ProfileType} from '../../../../redux/profile-reducer'

import s from './ProfileDescription.module.scss'

export type ProfileProps = {
   profile: ProfileType
   editMode: (value: boolean) => void
   isOwner: boolean
}

export const ProfileDescription: React.FC<ProfileProps> =
    ({profile, editMode, isOwner}) => {

       //We can cast the key argument to be of keyof Person to ensure TypeScript understands  what we’re aiming for. [key as keyof ContactType]
       const mappedInfo = Object.keys(profile.contacts).map((key, index) =>
           <Info key={index}
                 name={key}
                 description={profile.contacts[key as keyof ContactType]}/>)

       return (
           <aside className={s.sidebar}>
              <div className={s.central}>
                <span className={s.personal}>
                   Personal Info
                </span>
                 <Info name='Name' description={profile && profile.fullName}/>
                 <Info name='About me' description={profile && profile.aboutMe}/>
                 <Info name='Looking for a job' description={profile && profile.lookingForAJob ? 'Yes' : 'No'}/>
                 <Info name='Skills' description={profile && profile.lookingForAJobDescription}/>
                 {/*next info*/}
                 {mappedInfo}
                 {
                    isOwner &&
                    <div className={s.btnWrapper}>
                       <Button onClick={() => {
                          editMode(true)
                       }}>Edit</Button>
                    </div>
                 }
              </div>
           </aside>
       )
    }


