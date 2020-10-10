import React from 'react';
import s from './Users.module.css'
import avatar from '../../asets/images/user_photo.png';
import {UsersType} from '../../Redux/users-reducer';


type UsersPageType = {
    users: Array<UsersType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

export const Users: React.FC<UsersPageType> = ({users, follow, unfollow, setUsers}) => {
    if (users.length === 0) {
        setUsers(
            [{
                id: 1,
                name: 'Stanislav Ivanov',
                status: 'To be or not to be?',
                photos: {
                    small: 'url',
                    large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
                },
                followed: true
            },
                {
                    id: 2,
                    name: 'Den Ivanov',
                    status: 'I am ...',
                    photos: {
                        small: 'url',
                        large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
                    },
                    followed: false
                }]
        )
    }
    return (
        <div className={s.users_container}>
            <div className={s.users_headline}>Users</div>
            <div>
                <span className={s.users_page_num}>1 2 3 4 5 6</span>
                <div className={s.users_page}>
                    {users.map(u => <div className={s.user} key={u.id}>
                            <div className={s.avatar}><img alt={'avatar'} src={u.photos.large}/></div>
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
