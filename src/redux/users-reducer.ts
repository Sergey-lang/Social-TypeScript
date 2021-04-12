import {usersAPI} from '../api/users-api';
import {Dispatch} from 'redux';
import {APIResponseType, ResultCodes} from '../api/api';
import {updateObjectInArray} from '../utils/objectHelpers';
import {BaseThunkType, InferActionsTypes} from '../app/store';

let initializeState = {
    users: [] as UsersType[],
    totalUsersCount: 0,
    pageSize: 16,
    currentPage: 555,
    isFetching: false,
    followingInProgress: [] as number[], //array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

export type UsersInitializeStateType = typeof initializeState
export type FilterType = typeof initializeState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const usersReducer = (state: UsersInitializeStateType = initializeState, action: ActionsType): UsersInitializeStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            };
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            };
        case 'SN/USERS/SET-USERS':
            return {...state, users: [...action.users]};
        case 'SN/USERS/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SN/USERS/SET-USERS-TOTAL-COUNT':
            return {...state, totalUsersCount: action.totalCount};
        case 'SN/USERS/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'SN/USERS/FOLLOWING-IN-PROGRESS':
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            };
        case 'SN/USERS/SET-FILTER':
            return {
                ...state,
                filter: action.payload.filter
            }
        default:
            return state;
    }
};

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
    } as const),
    setFilter: (filter: FilterType) => ({
        type: 'SN/USERS/SET-FILTER',
        payload: {filter}
    } as const)
};

//Thunk
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    };
};

export const unfollow = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    };
};

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


