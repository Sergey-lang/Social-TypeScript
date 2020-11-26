import {AppStateType} from './store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {usersAPI} from '../api/user-api';

let initializeState: UsersInitializeStateType = {
   users: [],
   totalUsersCount: 0,
   pageSize: 5,
   currentPage: 5,
   isFetching: false,
   followingInProgress: []
}

export const usersReducer = (state: UsersInitializeStateType = initializeState, action: ActionsType): UsersInitializeStateType => {
   switch (action.type) {
      case 'USERS/FOLLOW':
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userID) {
                  return {...u, followed: true}
               }
               return u
            })
         }
      case 'USERS/UNFOLLOW':
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userID) {
                  return {...u, followed: false}
               }
               return u
            })
         }
      case 'USERS/SET-USERS':
         return {...state, users: [...action.users]}
      case 'USERS/SET-CURRENT-PAGE':
         return {...state, currentPage: action.currentPage}
      case 'USERS/SET-USERS-TOTAL-COUNT':
         return {...state, totalUsersCount: action.totalCount}
      case 'USERS/TOGGLE-IS-FETCHING':
         return {...state, isFetching: action.isFetching}
      case 'USERS/FOLLOWING-IN-PROGRESS':
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

//Action
export const followSuccess = (userID: number) => ({type: 'USERS/FOLLOW', userID} as const)
export const unfollowSuccess = (userID: number) => ({type: 'USERS/UNFOLLOW', userID} as const)
export const setUsers = (users: Array<UsersType>) => ({type: 'USERS/SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({
   type: 'USERS/SET-CURRENT-PAGE',
   currentPage
} as const)
export const setUsersTotalCount = (totalCount: number) => ({
   type: 'USERS/SET-USERS-TOTAL-COUNT',
   totalCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({
   type: 'USERS/TOGGLE-IS-FETCHING', isFetching
} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
   type: 'USERS/FOLLOWING-IN-PROGRESS',
   payload: {
      isFetching,
      userId
   }
} as const)

//Thunk
export const getUsers = (currentPage: number, pageSize: number): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
   dispatch(toggleIsFetching(true))
   usersAPI.getUsers(currentPage, pageSize)
      .then(data => {
         dispatch(toggleIsFetching(false))
         dispatch(setUsers(data.items))
         dispatch(setUsersTotalCount(data.totalCount))
      })
}

export const follow = (id: number): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
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

export const unfollow = (id: number): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
   dispatch(toggleFollowingProgress(true, id))
   usersAPI.unfollow(id)
      .then(data => {
         if (data.resultCode === 0) {
            dispatch(unfollowSuccess(id))
         }
         dispatch(toggleFollowingProgress(false, id))
      })
}

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ActionsType =
   ReturnType<typeof followSuccess> |
   ReturnType<typeof unfollowSuccess> |
   ReturnType<typeof setUsers> |
   ReturnType<typeof setCurrentPage> |
   ReturnType<typeof setUsersTotalCount> |
   ReturnType<typeof toggleIsFetching> |
   ReturnType<typeof toggleFollowingProgress>

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


