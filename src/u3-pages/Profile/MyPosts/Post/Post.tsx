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
       <div className={s.central}>
          <div className={s.info}>
             <figure>
                <img src={postImg} alt="userPostImg"/>
             </figure>
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
                <p>
                   {message}
                </p>
             </div>
          </div>
          <div className={s.moreInfo}>
             <ul>
                <li>
                   <div className={s.like}>
                      <img src={likeImg} alt="like"/>
                      <span>{likeCount}K</span>
                   </div>
                </li>
             </ul>
          </div>
       </div>
   )
}
