import s from './Description.module.css';
import React from 'react';
import {ContactType} from '../../u4-redux/profile-reducer';

export type ProfilePropsType = {
    aboutMe: string
    contacts: ContactType
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const Description: React.FC<ProfilePropsType> = ({aboutMe, contacts, lookingForAJob, lookingForAJobDescription}) => {
    return (
        <>
            <div className={s.description}>
                <div className={s.title}>
                    About me:
                </div>
                <div className={s.inform}>
                    {aboutMe}
                </div>
            </div>
            <div className={s.description}>
                <div className={s.title}>
                    Contacts:
                </div>
                <div className={s.inform}>
                    {contacts.github}
                </div>
            </div>
            <div className={s.description}>
                <div className={s.title}>
                    Looking For AJob:
                </div>
                <div className={s.inform}>
                    {lookingForAJob ? 'Yes' : 'No'}
                </div>
            </div>
            <div className={s.description}>
                <div className={s.title}>
                    Job Description:
                </div>
                <div className={s.inform}>
                    {lookingForAJobDescription}
                </div>
            </div>
        </>
    )
}


