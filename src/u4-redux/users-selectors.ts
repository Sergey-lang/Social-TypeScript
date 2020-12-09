import {AppStateType} from './store'
import {UsersType} from './users-reducer'

export const getUsers = (state: AppStateType): Array<UsersType> => {
   return state.usersState.users
}

export const getTotalUsersCount = (state: AppStateType): number => {
   return state.usersState.totalUsersCount
}

export const getPageSize = (state: AppStateType): number => {
   return state.usersState.pageSize
}

export const getCurrentPage = (state: AppStateType): number => {
   return state.usersState.currentPage
}

export const getIsFetching = (state: AppStateType): boolean => {
   return state.usersState.isFetching
}

export const getFollowingInProgress = (state: AppStateType): Array<number> => {
   return state.usersState.followingInProgress
}


