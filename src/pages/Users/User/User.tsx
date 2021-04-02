import noImg from '../../../assets/images/users/no-image-100.png'
import testBg from '../../../assets/images/users/bg-user.jpg'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {UsersType} from '../../../redux/users-reducer'
import {Button} from '../../../components/Button/Button'
import s from './User.module.scss'

type UserType = {
    user: UsersType
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number>
}

export const User: React.FC<UserType> = ({user, follow, unfollow, followingInProgress}) => {

    const userLarge = {
        backgroundImage: `url(${user.photos.large ? user.photos.large : testBg})`,
    }

    return (
        <div className={s.userWrapper}>
            <div className={s.userBox}>
                <div className={s.background} style={userLarge}>
                    <span className={s.followers}>
                        Followers: 120
                    </span>
                </div>
                <div className={s.friendMeta}>
                    <img alt={'avatar'} src={user.photos.large != null
                        ? user.photos.large
                        : noImg}
                         className={s.userPhoto}
                    />
                    <div className={s.friendName}>
                        <NavLink to={'/profile/' + user.id} className={s.linkToProfile}>{user.name}</NavLink>
                        <span className={s.country}>California, USA</span>
                    </div>
                    <ul className={s.friendInfo}>
                        <li className={s.frndInfoItem}>
                            <span className={s.fieldName}>User id:</span>
                            {user.id}
                        </li>
                        <li className={s.frndInfoItem}>
                            <span className={s.fieldName}>Followed:</span>
                            {user.followed ? 'Yes' : 'No'}
                        </li>
                    </ul>
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
            </div>
        </div>
    )
}



