import React from 'react';
import s from './Post.module.css';
import userPhoto from '../../../u1-assets/images/user_photo.png';

type MessageType = {
    message: string
    likeCount: number
}

function Post(props: MessageType) {
    return (
        <div className={s.post}>
            <div  className={s.postUserPhoto}>
                <img alt={'user'} src={userPhoto}/>
            </div>
            <div className={s.post_message}>{props.message}</div>
            <div className={s.likes_count}>likes {props.likeCount}</div>
        </div>
    )
}

export default Post;