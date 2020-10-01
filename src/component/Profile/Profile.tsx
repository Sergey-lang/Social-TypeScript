import React from 'react';
import style from './Profile.module.css';
import MyProfileInfo from './MyProfileInfo/MyProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ActionsTypes, ProfilePageType} from '../../essences/essences';

type ProfilePagePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

export const Profile: React.FC<ProfilePagePropsType> = (props) => {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
            />
        </div>
    )
}
