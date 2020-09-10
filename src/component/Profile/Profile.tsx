import React from 'react';
import style from './Profile.module.css';
import MyProfileInfo from './MyProfileInfo/MyProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ProfilePageType, updateNewPostText} from '../../Redux/State';

type ProfilePagePropsType = {
    profilePage: ProfilePageType
    addNewPost: () => void
    updateNewPostText: (changedPostText: string) => void
    sidebar: any
}

export function Profile(props: ProfilePagePropsType) {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo sidebar={props.sidebar}/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     addNewPost={props.addNewPost}
                     updateNewPostText={updateNewPostText}
            />
        </div>
    )
}
