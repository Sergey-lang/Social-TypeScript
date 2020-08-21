import React from 'react';
import style from './Profile.module.css';
import MyProfileInfo from './MyProfileInfo/MyProfileInfo';
import MyPosts from './MyPosts/MyPosts';

function Profile() {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo />
            <MyPosts />
        </div>
    )
}

export default Profile;