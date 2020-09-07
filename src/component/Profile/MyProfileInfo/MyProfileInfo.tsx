import React from 'react';
import style from './MyProfileInfo.module.css';
import avatar from './../../../asets/images/avatar.jpg';
import Sidebar from './Sidebar/Sidebar';

type MyProfileInfoType = {
    sidebar: any
}

function MyProfileInfo(props: MyProfileInfoType) {
    return (
        <div className={style.profile_wrapper}>
            <div className={style.profile_photo}>
                <img src={avatar}/>
            </div>
            <div className={style.profile_info}>
                <div className={style.user_name}>Sergey Kyharonak</div>
                <div className={style.status}>"Не бойтесь проигрывать. Победители не боятся проигрывать. Неудача—это
                    часть дороги к успеху. Люди, избегающие неудач—избегают и успехов"
                </div>
                <div className={style.descriptions_wrapper}>
                    <div className={style.description}>'Мой порядковый номер,на рукаве...' - 548616</div>
                    <div className={style.description}>USA</div>
                    <div className={style.description}>Los Angeles</div>
                </div>
            </div>
            <Sidebar sidebar={props.sidebar}/>
        </div>
    )
}

export default MyProfileInfo;