import React from 'react';
import style from './Message.module.css';
import avatar from './../../../asets/images/user_photo.png'


function Message() {
    return (
        <div className={style.dialog_block}>
            <div className={style.user_avatar_name}>
                <div className={style.avatar}><img src={avatar}/></div>
                <div className={style.user_name}>user name</div>
            </div>
            <div className={style.message}>
                <p>Lorem ipsum dolor sit amet,
                </p>
            </div>
        </div>
    )
}

export default Message;