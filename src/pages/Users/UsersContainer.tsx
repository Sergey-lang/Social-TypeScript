import React from 'react'
import {Users} from './Users'
import {useSelector} from 'react-redux'
import {getIsFetching} from '../../redux/users-selectors'
import {Preloader} from '../../components/Preloader/Preloader'
import {FilterType, UsersType} from '../../redux/users-reducer'

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
