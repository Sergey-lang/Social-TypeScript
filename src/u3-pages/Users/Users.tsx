import React, {useEffect} from 'react'
import {User} from './User/User'
import {UsersSearchForm} from './UsersSearchForm';
import {useDispatch, useSelector} from 'react-redux';
import {FilterType, requestUsers} from '../../u4-redux/users-reducer'
import {Paginator} from '../../u2-components/Paginator/Paginator'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../u4-redux/users-selectors';

import s from './Users.module.css'

export const Users: React.FC =
    (props) => {

        const followingInProgress = useSelector(getFollowingInProgress)
        const totalUsersCount = useSelector(getTotalUsersCount)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const users = useSelector(getUsers)

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(requestUsers(currentPage, pageSize, filter))
        }, [])

        const onPageChanged = (currentPage: number) => {
            dispatch(requestUsers(currentPage, pageSize, filter))
        }

        const onFilterChanged = (filter: FilterType) => {
            dispatch(requestUsers(1, pageSize, filter))
        }

        const follow = (id: number) => {
            dispatch(follow(id))
        }

        const unfollow = (id: number) => {
            dispatch(unfollow(id))
        }

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
                                              follow={follow}
                                              unfollow={unfollow}
                                              followingInProgress={followingInProgress}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }

