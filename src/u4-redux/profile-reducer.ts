import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './store';
import {profileAPI} from '../u5-api/profile-api';

let initializeState: ProfilePageInitType = {
   posts: [
      {id: 1, message: 'Hello I am props.', likeCount: 21},
      {id: 2, message: 'I am very handsome props', likeCount: 10},
      {id: 3, message: 'I go out from my post u3-features', likeCount: 5},
   ],
   profile: null as ProfileType | null,
   status: ''
}

export const profileReducer = (state: ProfilePageInitType = initializeState,
                               action: ActionsType): ProfilePageInitType => {
   switch (action.type) {
      case 'PROFILE/ADD-POST':
         return {
            ...state,
            posts: [{id: 4, message: action.postNewMessageText, likeCount: 0}, ...state.posts],
         };
      case 'PROFILE/SET-USER-PROFILE':
         return {...state, profile: action.profile}
      case 'PROFILE/GET-USER-STATUS':
         return {...state, status: action.userStatus}
      case 'PROFILE/UPDATE-PROFILE-STATUS':
         return {...state, status: action.status}
      default:
         return state
   }
}

//Action
export const addPost = (postNewMessageText: string) =>
   ({type: 'PROFILE/ADD-POST', postNewMessageText} as const)

export const setUserProfileData = (profile: ProfileType) =>
   ({type: 'PROFILE/SET-USER-PROFILE', profile} as const)

export const getUserStatus = (userStatus: string) =>
   ({type: 'PROFILE/GET-USER-STATUS', userStatus} as const)

export const setOwnProfileStatus = (status: string) =>
   ({type: 'PROFILE/UPDATE-PROFILE-STATUS', status} as const)

//Thunk
export const getUserProfileData = (userId: number): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
      profileAPI.getProfile(userId)
         .then(data => {
            dispatch(setUserProfileData(data))
         })
   }

export const getStatusFromUser = (userId: number): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
      profileAPI.getUserStatus(userId)
         .then(res => {
            dispatch(getUserStatus(res.data))
         })
   }

export const updateOwnProfileStatus = (status: string): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
      profileAPI.updateOwnProfileStatus(status)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(setOwnProfileStatus(status))
            }
         })
   }

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

type ActionsType =
   ReturnType<typeof addPost> |
   ReturnType<typeof setUserProfileData> |
   ReturnType<typeof getUserStatus> |
   ReturnType<typeof setOwnProfileStatus>

export type PostType = {
   id: number
   message: string
   likeCount: number
}
export type ContactType = {
   facebook: string
   website: string | null
   vk: string
   twitter: string
   instagram: string
   youtube: string | null
   github: string
   mainLink: string | null
}
export type PhotosType = {
   small: string | null
   large: string | null
}
export type ProfileType = {
   aboutMe: string
   contacts: ContactType
   lookingForAJob: boolean
   lookingForAJobDescription: string
   fullName: string
   userId: number
   photos: PhotosType
}
export type ProfilePageInitType = {
   posts: Array<PostType>
   profile: ProfileType | null
   status: string
}

