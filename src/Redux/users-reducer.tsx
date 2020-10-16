import React from 'react';
import {ActionsTypes} from '../essences/essences';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'

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
type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetUsersTotalCountACType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalCount: number
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
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

let usersInitializeState: UsersInitializeStateType = {
    users: [],
    totalUsersCount: 0, //all users
    pageSize: 5,
    currentPage: 5,
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
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        default:
            return state
    }
}

//ActionCreators
export const followAC = (userID: number): FollowACType => ({type: FOLLOW, userID}) as const
export const unfollowAC = (userID: number): UnfollowACType => ({type: UNFOLLOW, userID}) as const
export const setUsersAC = (users: Array<UsersType>): SetUsersACType => ({type: SET_USERS, users}) as const
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => ({
    type: SET_CURRENT_PAGE,
    currentPage
}) as const
export const setUsersTotalContAC = (totalCount: number): SetUsersTotalCountACType => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
}) as const


