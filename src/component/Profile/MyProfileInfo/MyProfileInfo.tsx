import React from 'react';
import style from './MyProfileInfo.module.css';
import avatar from './../../../asets/images/avatar.jpg';
import Sidebar from './Sidebar/Sidebar';

type MyProfileInfoType = {
    sidebar?: any
}

const MyProfileInfo: React.FC< MyProfileInfoType> = (props) => {
    return (
        <div className={style.profile_wrapper}>
            <div className={style.profile_photo}>
                <img alt={'avatar'} src={avatar}/>
            </div>
            <div className={style.profile_info}>
                <div className={style.user_name}>Sergey Kyharonak</div>
                <div className={style.status}>"Ученье свет, а за свет надо платить!"
                </div>
                <div className={style.descriptions_wrapper}>
                    <div className={style.description}>'Тут какое-то описание страницы</div>
                    <div className={style.description}>USA</div>
                    <div className={style.description}>Los Angeles</div>
                </div>
            </div>
            <Sidebar sidebar={props.sidebar}/>
        </div>
    )
}

export default MyProfileInfo;