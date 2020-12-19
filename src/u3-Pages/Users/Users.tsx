import s from './Users.module.css'
import React from 'react'
import {UsersType} from '../../u4-redux/users-reducer'
import {Paginator} from '../../u2-components/Paginator/Paginator'
import {User} from './User/User'

type UsersPageType = {
   pageSize: number
   totalUsersCount: number
   currentPage: number
   users: Array<UsersType>
   follow: any
   unfollow: any
   onPageChanged: (p: number) => void
   isFetching: boolean
   followingInProgress: Array<number>
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
        ...props
     }) => {

       return (
           <div className={s.users_container}>
              <div className={s.users_headline}>Users</div>
              <div>
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



