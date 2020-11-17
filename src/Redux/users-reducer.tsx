import React from 'react';
import {GlobalStateType} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {ActionsTypes, ThunkType} from '../essences/essences';
import {usersAPI} from '../API/user-api';

enum ActionsType {
   FOLLOW = 'USERS/FOLLOW',
   UNFOLLOW = 'USERS/UNFOLLOW',
   SET_USERS = 'USERS/SET-USERS',
   SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE',
   SET_USERS_TOTAL_COUNT = 'USERS/SET-USERS-TOTAL-COUNT',
   TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING',
   FOLLOWING_IN_PROGRESS = 'USERS/FOLLOWING-IN-PROGRESS',
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
   followingInProgress: Array<number>
}

let initializeState: UsersInitializeStateType = {
   users: [],
   totalUsersCount: 0,
   pageSize: 5,
   currentPage: 5,
   isFetching: false,
   followingInProgress: []
}

export const usersReducer = (state: UsersInitializeStateType = initializeState, action: ActionsTypes): UsersInitializeStateType => {
   switch (action.type) {
      case ActionsType.FOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userID) {
                  return {...u, followed: true}
               }
               return u
            })
         }
      case ActionsType.UNFOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userID) {
                  return {...u, followed: false}
               }
               return u
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
      case ActionsType.FOLLOWING_IN_PROGRESS:
         return {
            ...state,
            followingInProgress: action.payload.isFetching
               ? [...state.followingInProgress, action.payload.userId]
               : state.followingInProgress.filter(id => id !== action.payload.userId)
         }
      default:
         return state
   }
}
type FollowACType = {
   type: ActionsType.FOLLOW
   userID: number
}
export const followSuccess = (userID: number): FollowACType => ({type: ActionsType.FOLLOW, userID})
type UnfollowACType = {
   type: ActionsType.UNFOLLOW
   userID: number
}
export const unfollowSuccess = (userID: number): UnfollowACType => ({type: ActionsType.UNFOLLOW, userID})
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
type followingProgressACType = {
   type: ActionsType.FOLLOWING_IN_PROGRESS
   payload: {
      isFetching: boolean,
      userId: number
   }
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): followingProgressACType => ({
   type: ActionsType.FOLLOWING_IN_PROGRESS,
   payload: {
      isFetching,
      userId
   }
})

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {

   return (dispatch: ThunkDispatch<GlobalStateType, unknown, ActionsTypes>) => {

      dispatch(toggleIsFetching(true))
      usersAPI.getUsers(currentPage, pageSize)
         .then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setUsersTotalCount(data.totalCount))
         })
   }
}

export const follow = (id: number): ThunkType => {
   return (dispatch: ThunkDispatch<GlobalStateType, unknown, ActionsTypes>) => {
      dispatch(toggleFollowingProgress(true, id))
      usersAPI.follow(id)
         .then(data => {
            debugger
            if (data.resultCode === 0) {
               dispatch(followSuccess(id))
            }
            dispatch(toggleFollowingProgress(false, id))
         })
   }
}

export const unfollow = (id: number): ThunkType => {
   return (dispatch: ThunkDispatch<GlobalStateType, unknown, ActionsTypes>) => {
      dispatch(toggleFollowingProgress(true, id))
      usersAPI.unfollow(id)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(unfollowSuccess(id))
            }
            dispatch(toggleFollowingProgress(false, id))
         })
   }
}

