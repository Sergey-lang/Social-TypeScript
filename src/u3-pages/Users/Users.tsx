import React from 'react'
import {FilterType, UsersType} from '../../u4-redux/users-reducer'
import {Paginator} from '../../u2-components/Paginator/Paginator'
import {User} from './User/User'

import s from './Users.module.css'
import {UsersSearchForm} from "./UsersSearchForm";

type UsersPageType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    users: Array<UsersType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    onPageChanged: (p: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    onFilterChanged: (filter: FilterType) => void
}

export const Users: React.FC<UsersPageType> =
    ({
         pageSize,
         totalUsersCount,
         currentPage,
         users,
         onPageChanged,
         isFetching,
         followingInProgress,
         onFilterChanged,
         ...props
     }) => {

        return (
            <div className={s.users_container}>
                <div className={s.users_headline}>Users</div>
                <div>
                    <UsersSearchForm onFilterChanged={onFilterChanged}/>
                    <Paginator currentPage={currentPage}
                               onPageChanged={onPageChanged}
                               pageSize={pageSize}
                               totalItemsCount={totalUsersCount}
                    />
                    <div className={s.users_page}>
                        {users.map(u => <User key={u.id}
                                              user={u}
                                              follow={props.follow}
                                              unfollow={props.unfollow}
                                              followingInProgress={followingInProgress}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }

