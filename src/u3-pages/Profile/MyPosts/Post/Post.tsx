import React from 'react'
import postImg from '../../../../u1-assets/images/user.jpg'
import likeImg from '../../../../u1-assets/images/post/love.svg'

import s from './Post.module.scss'

type MessageType = {
   message: string
   likeCount: number
}

export const Post: React.FC<MessageType> = ({message, likeCount}) => {
   return (
       <div className={s.postWrapper}>
          <div className={s.info}>
             <div className={s.senderImg}>
                <img src={postImg} alt="userPostImg"/>
             </div>
             <div className={s.name}>
                <ins>
                   <a href="#">Jack Carter</a>
                </ins>
                <span>
                   <i></i>
                   published: December, 31 2020 23.59:PM
                </span>
             </div>
          </div>
          <div className={s.postMeta}>
             <div className={s.detail}>
                <p className={s.messageText}>
                   {message}
                </p>
             </div>
          </div>
          <div className={s.moreInfo}>
             <ul className={s.infoList}>
                <li className={s.infoItem}>
                   <div className={s.like}>
                      <img className={s.likesImg} src={likeImg} alt="like"/>
                      <span>{likeCount}K</span>
                   </div>
                </li>
             </ul>
          </div>
       </div>
   )
}
