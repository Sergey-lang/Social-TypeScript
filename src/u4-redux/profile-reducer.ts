import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppStateType} from './store'
import {profileAPI} from '../u5-api/profile-api'
import {FormAction, stopSubmit} from 'redux-form'

let initialState = {
   posts: [
      {id: 1, message: 'Hello I am props.', likeCount: 21},
      {id: 2, message: 'I am very handsome props', likeCount: 10},
      {id: 3, message: 'I go out from my post u3-pages', likeCount: 5},
   ] as Array<PostType>,
   profile: null as ProfileType | null,
   status: ''
}

export type ProfileInitialStateType = typeof initialState

export const profileReducer = (state: ProfileInitialStateType = initialState,
                               action: ActionsType): ProfileInitialStateType => {
   switch (action.type) {
      case 'PROFILE/ADD-POST':
         return {
            ...state,
            posts: [{id: 4, message: action.postNewMessageText, likeCount: 0}, ...state.posts],
         }
      case 'PROFILE/SET-USER-PROFILE':
         return {...state, profile: action.profile}
      case 'PROFILE/GET-USER-STATUS':
         return {...state, status: action.userStatus}
      case 'PROFILE/UPDATE-PROFILE-STATUS':
         return {...state, status: action.status}
      case 'PROFILE/SAVE-PHOTO-SUCCESS':
         return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
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

export const savePhotoSuccess = (photos: PhotosType) => ({type: 'PROFILE/SAVE-PHOTO-SUCCESS', photos} as const)

//Thunk
export const getUserProfileData = (userId: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.getProfile(userId)
       dispatch(setUserProfileData(data))
    }

export const getStatusFromUser = (userId: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const res = await profileAPI.getUserStatus(userId)
       dispatch(getUserStatus(res.data))
    }

export const updateOwnProfileStatus = (status: string): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.updateOwnProfileStatus(status)
       if (data.resultCode === 0) {
          dispatch(setOwnProfileStatus(status))
       }
    }

export const savePhoto = (file: File): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.savePhoto(file)
       if (data.resultCode === 0) {
          dispatch(savePhotoSuccess(data.data.photos))
       }
    }

export const saveProfileData = (profile: ProfileType): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>, getState) => {
       const userId = getState().authState.id
       const data = await profileAPI.saveProfile(profile)
       if (data.resultCode === 0) {
          dispatch(getUserProfileData(userId as number))
       } else {
          //need changing error for different fields
          // dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': messages}}))
          const messages = data.messages.length > 0 ? data.messages[0] : 'some error'
          dispatch(stopSubmit('profile-data', {_error: messages}))
          return Promise.reject(messages)
       }
    }

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

type ActionsType =
    ReturnType<typeof addPost> |
    ReturnType<typeof setUserProfileData> |
    ReturnType<typeof getUserStatus> |
    ReturnType<typeof setOwnProfileStatus> |
    ReturnType<typeof savePhotoSuccess>

export type PostType = {
   id: number
   message: string
   likeCount: number
}
export type ContactType = {
   github: string
   vk: string
   facebook: string
   instagram: string
   twitter: string
   website: string
   youtube: string
   mainLink: string
}

export type PhotosType = {
   small: string | null
   large: string | null
}

export type ProfileType = {
   userId: number
   lookingForAJob: boolean
   lookingForAJobDescription: string
   fullName: string
   contacts: ContactType
   aboutMe: string
   photos: PhotosType
}


