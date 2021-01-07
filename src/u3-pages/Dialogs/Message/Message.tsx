import React from 'react'
import style from './Message.module.css'
import avatar from '../../../u1-assets/images/user_photo.png'

type PropsType = {
   message: string
   id: number
}

export const Message: React.FC<PropsType> = (props) => {
   return (
       <div className={style.message_block}>
          <div className={style.user_avatar_name}>
             <div className={style.avatar}><img alt={'avatar'} src={avatar}/></div>
             <div className={style.user_name}>user name</div>
          </div>
          <div className={style.message}>
             <p>{props.message}
             </p>
          </div>
       </div>
   )
}
