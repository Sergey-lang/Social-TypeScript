import React from 'react';
import style from './MyProfileInfo.module.css';
import avatar from './../../../asets/images/avatar.jpg';

function MyProfileInfo() {
  return (
    <div className={style.profile_wrapper}>
      <div className={style.profile_photo}>
          <img src={avatar}/>
          </div>
      <div className={style.profile_info}>
        <div className={style.status}>status</div>
        <div className={style.descriptions_wrapper}>
          <div className={style.description}>ID</div>
          <div className={style.description}>Countru</div>
          <div className={style.description}>City</div>
        </div>
      </div>
    </div>
  )
}

export default MyProfileInfo;