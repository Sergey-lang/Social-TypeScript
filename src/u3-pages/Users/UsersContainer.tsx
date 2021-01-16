import React from 'react'
import {Users} from './Users'
import {useSelector} from 'react-redux'
import {getIsFetching} from '../../u4-redux/users-selectors'
import {Preloader} from '../../u2-components/Preloader/Preloader'
import {FilterType, UsersType} from '../../u4-redux/users-reducer'

type UserPagePropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    filter: FilterType
}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}
