import React from 'react';
import style from './Profile.module.css';
import MyProfileInfo from './MyProfileInfo/MyProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ProfilePageType} from '../../Redux/State';

type ProfilePagePropsType = {
    profilePage: ProfilePageType
    addNewPost: (postText: string) => void
}

function Profile(props: ProfilePagePropsType) {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     addNewPost={props.addNewPost}
            />
        </div>
    )
}

export default Profile;