import React from 'react';
import style from './Sidebar.module.css';
import userPhoto from '../../../../u1-assets/images/user_photo.png'

type SidebarPropsType = {
    sidebar?: any
}

function Sidebar(props: SidebarPropsType) {
    return (
        <div className={style.sidebar_wrapper}>
            <div className={style.sb_user_photo}><img alt={'avatar'} src={userPhoto}/></div>
            <div className={style.sb_user_photo}><img alt={'avatar'} src={userPhoto}/></div>
            <div className={style.sb_user_photo}><img alt={'avatar'} src={userPhoto}/></div>
            <div className={style.sb_user_photo}><img alt={'avatar'} src={userPhoto}/></div>
            <div className={style.sb_user_photo}><img alt={'avatar'} src={userPhoto}/></div>
            <div className={style.sb_user_photo}><img alt={'avatar'} src={userPhoto}/></div>
        </div>
    )
}

export default Sidebar;