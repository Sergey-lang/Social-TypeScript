import React from 'react';
import s from './Users.module.css'
import avatar from '../../asets/images/icons8_user.png';
import {UsersType} from '../../Redux/users-reducer';
import axios from 'axios'


type UsersPageType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

export const UsersExample: React.FC<UsersPageType> = ({users, follow, unfollow, setUsers}) => {
    let getUsers = () => {
        if (users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    setUsers(response.data.items)
                })
        }
    }

    return (
        <div className={s.users_container}>
            <div className={s.users_headline}>Users</div>
            <div>
                <span className={s.users_page_num}>1 2 3 4 5 6</span>
                <div className={s.users_page}>
                    {users.map(u => <div className={s.user} key={u.id}>
                            <div className={s.avatar}>
                                <img alt={'avatar'} src={u.photos.large != null
                                    ? u.photos.large
                                    : avatar}/>
                            </div>
                            <div className={s.description}>
                                <div className={s.user_name}>{u.name}</div>
                                <div className={s.status}>{u.status}</div>
                            </div>
                            {
                                u.followed ? <button
                                        onClick={(e) => {
                                            follow(u.id)
                                        }}
                                        className={s.btn}>follow</button>
                                    : <button
                                        onClick={(e) => {
                                            unfollow(u.id)
                                        }}
                                        className={` ${s.btn} ${s.unfollow}`}>unfollow</button>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
