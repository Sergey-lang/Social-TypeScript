import React from 'react';
import style from './Profile.module.css';
import MyProfileInfo from './MyProfileInfo/MyProfileInfo';
import {StoreReduxType} from '../../Redux/redux-store';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

type ProfilePagePropsType = {
    store: StoreReduxType
}

export const Profile: React.FC<ProfilePagePropsType> = (props) => {
    return (
        <div className={style.app_wrapper_content}>
            <MyProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}
