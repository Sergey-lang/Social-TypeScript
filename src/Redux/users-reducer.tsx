import React from 'react';
import {ActionsTypes} from '../essences/essences';

enum ActionsType {
    FOLLOW = 'USERS/FOLLOW',
    UNFOLLOW = 'USERS/UNFOLLOW',
    SET_USERS = 'USERS/SET-USERS',
    SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE',
    SET_USERS_TOTAL_COUNT = 'USERS/SET-USERS-TOTAL-COUNT',
    TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING'
}

type FollowACType = {
    type: ActionsType.FOLLOW
    userID: number
}
type UnfollowACType = {
    type: ActionsType.UNFOLLOW
    userID: number
}
type SetUsersACType = {
    type: ActionsType.SET_USERS,
    users: any
}
type SetCurrentPageACType = {
    type: ActionsType.SET_CURRENT_PAGE
    currentPage: number
}
type SetUsersTotalCountACType = {
    type: ActionsType.SET_USERS_TOTAL_COUNT
    totalCount: number
}
type ToggleIsFetchingACType = {
    type: ActionsType.TOGGLE_IS_FETCHING
    isFetching: boolean
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
    isFetching: boolean
}

let usersInitializeState: UsersInitializeStateType = {
    users: [],
    totalUsersCount: 0, //all users
    pageSize: 5,
    currentPage: 5,
    isFetching: false
}

export const usersReducer = (state: UsersInitializeStateType = usersInitializeState, action: ActionsTypes): UsersInitializeStateType => {
    switch (action.type) {
        case ActionsType.FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    } else return u
                })
            }
        case ActionsType.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    } else return u
                })
            }
        case ActionsType.SET_USERS:
            return {...state, users: [...action.users]}
        case ActionsType.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case ActionsType.SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case ActionsType.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//ActionCreators
export const follow = (userID: number): FollowACType => ({type: ActionsType.FOLLOW, userID})
export const unfollow = (userID: number): UnfollowACType => ({type: ActionsType.UNFOLLOW, userID})
export const setUsers = (users: Array<UsersType>): SetUsersACType => ({type: ActionsType.SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({
    type: ActionsType.SET_CURRENT_PAGE,
    currentPage
})
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountACType => ({
    type: ActionsType.SET_USERS_TOTAL_COUNT,
    totalCount
})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => ({
    type: ActionsType.TOGGLE_IS_FETCHING, isFetching
})

