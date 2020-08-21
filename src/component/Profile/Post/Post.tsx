import React from 'react';
import style from './Post.module.css';
import userPhoto from './../../../asets/images/user_photo.png';

function Post() {
    return (
        <div className={style.post}>
            <img src={userPhoto} className={style.post_user_photo}/>
            <div className={style.post_message}>
                This is the best post in the world!<br/>
                This is new text in this post!!I have to check length which contain in this area.
                This is new text in this post!!I have to check length which contain in this area.
                This is new text in this post!!I have to check length which contain in this area.
                Time to time a write a new text here)
            </div>
            <div className={style.likes_count}>likes 0</div>
        </div>
    )
}

export default Post;