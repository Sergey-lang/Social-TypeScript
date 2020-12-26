import s from './User.module.css'
import avatar from '../../../u1-assets/images/icons8_user.png'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button} from '../../../u2-components/Button/Button'
import {UsersType} from '../../../u4-redux/users-reducer'

type UserType = {
   user: UsersType
   follow: (id: number) => void
   unfollow: (id: number) => void
   followingInProgress: Array<number>
}

export const User: React.FC<UserType> = ({user, follow, unfollow, followingInProgress}) => {

   return (
       <div className={s.user}>
          <div className={s.avatar}>
             <NavLink to={'/profile/' + user.id} className={s.link_to_profile}>
                <img alt={'avatar'} src={user.photos.large != null
                    ? user.photos.large
                    : avatar}/>
             </NavLink>
          </div>
          <div className={s.description}>
             <div className={s.user_name}>{user.name}</div>
             <div className={s.status}>User status: {user.status}</div>
             <div className={s.status}>User id: {user.id}</div>
          </div>
          {
             user.followed ? <Button
                     className={s.btn}
                     disabled={followingInProgress.some(id => id === user.id)}
                     onClick={() => {
                        unfollow(user.id)
                     }}>Unfollow</Button>
                 : <Button
                     className={s.btn}
                     disabled={followingInProgress.some(id => id === user.id)}
                     onClick={() => {
                        follow(user.id)
                     }}>Follow</Button>
          }
       </div>
   )
}



