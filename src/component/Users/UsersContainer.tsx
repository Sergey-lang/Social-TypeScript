import React from 'react';
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../Redux/redux-store';
import {followAC, setUsersAC, unfollowAC, UsersType} from '../../Redux/users-reducer';
import {Dispatch} from 'redux';

type MapStateType = {
    users: Array<UsersType>
}
type MapDispatchType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UsersType>) => void
}

const mapState = (state: AppStateType): MapStateType => {
    return {
        users: state.usersReducer.users
    }
}

const mapDispatch = (dispatch: Dispatch): MapDispatchType => {
    return {
        follow: (userID: number) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapState, mapDispatch)(Users)
