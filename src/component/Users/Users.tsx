import s from './Users.module.css';
import avatar from '../../asets/images/icons8_user.png';
import React from 'react';
import {UsersType} from '../../Redux/users-reducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios'

type UsersPageType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (p: number) => void
}

type ResponseType = {
    resultCode: number
    message: string
    data: object
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
                            <NavLink to={'/profile/' + u.id} className={s.link_to_profile}>
                                <img alt={'avatar'} src={u.photos.large != null
                                    ? u.photos.large
                                    : avatar}/>
                            </NavLink>
                        </div>
                        <div className={s.description}>
                            <div className={s.user_name}>{u.name}</div>
                            <div className={s.status}>User status: {u.status}</div>
                            <div className={s.status}>User id: {u.id}</div>
                        </div>
                        {
                            u.followed ? <button
                                    onClick={() => {
                                        axios.delete<ResponseType>(
                                            `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                            {
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'
                                                }
                                            }
                                        ).then((response) => {
                                            if (response.data.resultCode === 0) {
                                                unfollow(u.id)
                                            }
                                        })
                                    }}
                                    className={s.btn}>Unfollow</button>
                                : <button
                                    onClick={() => {
                                        axios.post<ResponseType>(
                                            `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                            {
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'
                                                }
                                            }
                                        ).then((response) => {
                                            if (response.data.resultCode === 0) {
                                                follow(u.id)
                                            }
                                        })
                                    }}
                                    className={s.btn}>Follow</button>
                        }
                    </div>)}
                </div>
            </div>
        </div>
    )
}



