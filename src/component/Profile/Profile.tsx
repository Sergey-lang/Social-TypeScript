import {MyProfileInfo} from './MyProfileInfo/MyProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import React from 'react';

export const Profile: React.FC = (props) => {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
