import React from 'react';
import style from './Post.module.css';
import userPhoto from './../../../asets/images/user_photo.png';

type MessageType = {
    message: string
    likeCount: number
}

function Post(props: MessageType) {
    return (
        <div className={style.post}>
            <img alt={'user'} src={userPhoto} className={style.post_user_photo}/>
            <div className={style.post_message}>{props.message}</div>
            <div className={style.likes_count}>likes {props.likeCount}</div>
        </div>
    )
}

export default Post;