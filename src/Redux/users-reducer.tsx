import React from 'react';
import {ActionsTypes} from '../essences/essences';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type FollowACType = {
    type: typeof FOLLOW
    userID: number
}
type UnfollowACType = {
    type: typeof UNFOLLOW,
    userID: number
}
type SetUsersACType = {
    type: typeof SET_USERS,
    users: any
}

export type PhotosType = {
    small: string
    large: string
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type UsersInitializeStateType = {
    users: Array<UsersType>
}

let usersInitializeState: UsersInitializeStateType = {
    users: [ ]
}

export const usersReducer = (state: UsersInitializeStateType = usersInitializeState, action: ActionsTypes): UsersInitializeStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    } else return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    } else return u
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

//ActionCreators
export const followAC = (userID: number): FollowACType => ({type: FOLLOW, userID}) as const
export const unfollowAC = (userID: number): UnfollowACType => ({type: UNFOLLOW, userID}) as const
export const setUsersAC = (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, users}) as const


