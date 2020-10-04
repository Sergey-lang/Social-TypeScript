import React from 'react';
import style from './Profile.module.css';
import MyProfileInfo from './MyProfileInfo/MyProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export const Profile: React.FC = (props) => {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
