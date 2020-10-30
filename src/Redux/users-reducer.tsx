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

export type PhotosType = {
    small: string | null
    large: string | null
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

let initializeState: UsersInitializeStateType = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 5,
    isFetching: false
}

export const usersReducer = (state: UsersInitializeStateType = initializeState, action: ActionsTypes): UsersInitializeStateType => {
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
type FollowACType = {
    type: ActionsType.FOLLOW
    userID: number
}
export const follow = (userID: number): FollowACType => ({type: ActionsType.FOLLOW, userID})
type UnfollowACType = {
    type: ActionsType.UNFOLLOW
    userID: number
}
export const unfollow = (userID: number): UnfollowACType => ({type: ActionsType.UNFOLLOW, userID})
type SetUsersACType = {
    type: ActionsType.SET_USERS,
    users: any
}
export const setUsers = (users: Array<UsersType>): SetUsersACType => ({type: ActionsType.SET_USERS, users})
type SetCurrentPageACType = {
    type: ActionsType.SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({
    type: ActionsType.SET_CURRENT_PAGE,
    currentPage
})
type SetUsersTotalCountACType = {
    type: ActionsType.SET_USERS_TOTAL_COUNT
    totalCount: number
}
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountACType => ({
    type: ActionsType.SET_USERS_TOTAL_COUNT,
    totalCount
})
type ToggleIsFetchingACType = {
    type: ActionsType.TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingACType => ({
    type: ActionsType.TOGGLE_IS_FETCHING, isFetching
})

