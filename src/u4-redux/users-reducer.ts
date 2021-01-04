import {AppStateType, InferActionsType} from './store'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {usersAPI} from '../u5-api/user-api'

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
type ActionsType = InferActionsType<typeof actions>

export const actions = {
   followSuccess: (userID: number) => ({type: 'USERS/FOLLOW', userID} as const),
   unfollowSuccess: (userID: number) => ({type: 'USERS/UNFOLLOW', userID} as const),
   setUsers: (users: Array<UsersType>) => ({type: 'USERS/SET-USERS', users} as const),
   setCurrentPage: (currentPage: number) => ({
      type: 'USERS/SET-CURRENT-PAGE',
      currentPage
   } as const),
   setUsersTotalCount: (totalCount: number) => ({
      type: 'USERS/SET-USERS-TOTAL-COUNT',
      totalCount
   } as const),
   toggleIsFetching: (isFetching: boolean) => ({
      type: 'USERS/TOGGLE-IS-FETCHING', isFetching
   } as const),
   toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
      type: 'USERS/FOLLOWING-IN-PROGRESS',
      payload: {
         isFetching,
         userId
      }
   } as const)
}

//Thunk
export const requestUsers = (requestPage: number, pageSize: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       dispatch(actions.toggleIsFetching(true))
       dispatch(actions.setCurrentPage(requestPage))
       const data = await usersAPI.getUsers(requestPage, pageSize)
       dispatch(actions.toggleIsFetching(false))
       dispatch(actions.setUsers(data.items))
       dispatch(actions.setUsersTotalCount(data.totalCount))
    }

export const follow = (id: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       dispatch(actions.toggleFollowingProgress(true, id))
       const data = await usersAPI.follow(id)
       if (data.resultCode === 0) {
          dispatch(actions.followSuccess(id))
       }
       dispatch(actions.toggleFollowingProgress(false, id))
    }

export const unfollow = (id: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       dispatch(actions.toggleFollowingProgress(true, id))
       const data = await usersAPI.unfollow(id)
       if (data.resultCode === 0) {
          dispatch(actions.unfollowSuccess(id))
       }
       dispatch(actions.toggleFollowingProgress(false, id))
    }

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

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


