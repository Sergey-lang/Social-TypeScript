import s from './Users.module.css';
import avatar from '../../asets/images/icons8_user.png';
import React from 'react';
import {UsersType} from '../../Redux/users-reducer';

type UsersPageType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (p: number) => void
}

export const Users: React.FC<UsersPageType> = ({totalUsersCount, pageSize, currentPage, users, follow, unfollow, onPageChanged, ...props}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 505; i <= 525; i++) {
        pages.push(i)
    }
    return (
        <div className={s.users_container}>
            <div className={s.users_headline}>Users</div>
            <div>
                <div className={s.users_page_num}>
                    {pages.map(p => {
                        return <span key={Math.random()}
                                     className={currentPage === p ? `${s.selected} ${s.totalCount}` : s.totalCount}
                                     onClick={() => onPageChanged(p)}
                        >{p}</span>
                    })}
                </div>
                <div className={s.users_page}>
                    {users.map(u => <div className={s.user} key={u.id}>
                        <div className={s.avatar}>
                            <img alt={'avatar'} src={u.photos.large != null
                                ? u.photos.large
                                : avatar}/>
                        </div>
                        <div className={s.description}>
                            <div className={s.user_name}>{u.name}</div>
                            <div className={s.status}>User status: {u.status}</div>
                            <div className={s.status}>User id: {u.id}</div>
                        </div>
                        {
                            u.followed ? <button
                                    onClick={() => {
                                        follow(u.id)
                                    }}
                                    className={s.btn}>follow</button>
                                : <button
                                    onClick={() => {
                                        unfollow(u.id)
                                    }}
                                    className={` ${s.btn} ${s.unfollow}`}>unfollow</button>
                        }
                    </div>)}
                </div>
            </div>
        </div>
    )
}



