import {AppStateType, BaseThunkType, InferActionsType} from './store'
import {ThunkDispatch} from 'redux-thunk'
import {usersAPI} from '../u5-api/users-api'

let initializeState = {
   users: [] as UsersType[],
   totalUsersCount: 0,
   pageSize: 5,
   currentPage: 5,
   isFetching: false,
   followingInProgress: [] as number[] //array of users id
}

export type UsersInitializeStateType = typeof initializeState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


export const usersReducer = (state: UsersInitializeStateType = initializeState, action: ActionsType): UsersInitializeStateType => {
   switch (action.type) {
      case 'SN/USERS/FOLLOW':
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userID) {
                  return {...u, followed: true}
               }
               return u
            })
         }
      case 'SN/USERS/UNFOLLOW':
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userID) {
                  return {...u, followed: false}
               }
               return u
            })
         }
      case 'SN/USERS/SET-USERS':
         return {...state, users: [...action.users]}
      case 'SN/USERS/SET-CURRENT-PAGE':
         return {...state, currentPage: action.currentPage}
      case 'SN/USERS/SET-USERS-TOTAL-COUNT':
         return {...state, totalUsersCount: action.totalCount}
      case 'SN/USERS/TOGGLE-IS-FETCHING':
         return {...state, isFetching: action.isFetching}
      case 'SN/USERS/FOLLOWING-IN-PROGRESS':
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
export const actions = {
   followSuccess: (userID: number) => ({type: 'SN/USERS/FOLLOW', userID} as const),
   unfollowSuccess: (userID: number) => ({type: 'SN/USERS/UNFOLLOW', userID} as const),
   setUsers: (users: Array<UsersType>) => ({type: 'SN/USERS/SET-USERS', users} as const),
   setCurrentPage: (currentPage: number) => ({
      type: 'SN/USERS/SET-CURRENT-PAGE',
      currentPage
   } as const),
   setUsersTotalCount: (totalCount: number) => ({
      type: 'SN/USERS/SET-USERS-TOTAL-COUNT',
      totalCount
   } as const),
   toggleIsFetching: (isFetching: boolean) => ({
      type: 'SN/USERS/TOGGLE-IS-FETCHING', isFetching
   } as const),
   toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
      type: 'SN/USERS/FOLLOWING-IN-PROGRESS',
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


