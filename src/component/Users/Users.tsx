import s from './Users.module.css';
import avatar from '../../asets/images/icons8_user.png';
import React from 'react';
import {UsersType} from '../../Redux/users-reducer';
import {NavLink} from 'react-router-dom';
import {Button} from '../../common/Button/Button';

type UsersPageType = {
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    follow: any
    unfollow: any
    onPageChanged: (p: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
}

export const Users: React.FC<UsersPageType> = ({pageSize, currentPage, users,onPageChanged, isFetching, followingInProgress,  ...props}) => {

    // let pagesCount = Math.ceil(totalUsersCount / pageSize)
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
                            u.followed ? <Button
                                    className={s.btn}
                                    disabled={followingInProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</Button>
                                : <Button
                                    className={s.btn}
                                    disabled={followingInProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        props.follow(u.id)
                                        // toggleFollowingProgress(true, u.id)
                                        // usersAPI.unfollow(u.id)
                                        //     .then((data) => {
                                        //         if (data.resultCode === 0) {
                                        //             followSuccess(u.id)
                                        //         }
                                        //         toggleFollowingProgress(false, u.id)
                                        //     })
                                    }}>Follow</Button>
                        }
                    </div>)}
                </div>
            </div>
        </div>
    )
}



