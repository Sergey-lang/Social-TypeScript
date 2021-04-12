import {ThunkDispatch} from 'redux-thunk'
import {profileAPI} from '../api/profile-api'
import {FormAction, stopSubmit} from 'redux-form'
import {ResultCodes} from '../api/api'
import {AppStateType, BaseThunkType, InferActionsTypes} from '../app/store';

let initialState = {
   posts: [
      {id: 1, message: 'Hello I am props.', likeCount: 21},
      {id: 2, message: 'I am very handsome props', likeCount: 10},
      {id: 3, message: 'I go out from my post pages', likeCount: 5},
   ] as Array<PostType>,
   profile: null as ProfileType | null,
   status: ''
}

export type ProfileInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const profileReducer = (state: ProfileInitialStateType = initialState,
                               action: ActionsType): ProfileInitialStateType => {
   switch (action.type) {
      case 'SN/PROFILE/ADD-POST':
         return {
            ...state,
            posts: [{id: 4, message: action.postNewMessageText, likeCount: 0}, ...state.posts],
         }
      case 'SN/PROFILE/SET-USER-PROFILE':
         return {...state, profile: action.profile}
      case 'SN/PROFILE/GET-USER-STATUS':
         return {...state, status: action.userStatus}
      case 'SN/PROFILE/UPDATE-PROFILE-STATUS':
         return {...state, status: action.status}
      case 'SN/PROFILE/SAVE-PHOTO-SUCCESS':
         return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
      default:
         return state
   }
}

//Action
export const actions = {
   addPost:(postNewMessageText: string) =>
       ({type: 'SN/PROFILE/ADD-POST', postNewMessageText} as const),
   setUserProfileData:(profile: ProfileType) =>
       ({type: 'SN/PROFILE/SET-USER-PROFILE', profile} as const),
   getUserStatus:(userStatus: string) =>
       ({type: 'SN/PROFILE/GET-USER-STATUS', userStatus} as const),
   setOwnProfileStatus:(status: string) =>
       ({type: 'SN/PROFILE/UPDATE-PROFILE-STATUS', status} as const),
   savePhotoSuccess:(photos: PhotosType) => ({type: 'SN/PROFILE/SAVE-PHOTO-SUCCESS', photos} as const)
}

//Thunk
export const getUserProfileData = (userId: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.getProfile(userId)
       dispatch(actions.setUserProfileData(data))
    }

export const getStatusFromUser = (userId: number): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.getUserStatus(userId)
       dispatch(actions.getUserStatus(data))
    }

export const updateOwnProfileStatus = (status: string): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.updateOwnProfileStatus(status)
       if (data.resultCode === ResultCodes.Success) {
          dispatch(actions.setOwnProfileStatus(status))
       }
    }

export const savePhoto = (file: File): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
       const data = await profileAPI.savePhoto(file)
       if (data.resultCode === ResultCodes.Success) {
          dispatch(actions.savePhotoSuccess(data.data.photos))
       }
    }

export const saveProfileData = (profile: ProfileType): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>, getState) => {
       const userId = getState().authState.id
       const data = await profileAPI.saveProfile(profile)
       if (data.resultCode === ResultCodes.Success) {
          if(userId !== null) {
             dispatch(getUserProfileData(userId))
          } else {
             throw new Error(`userId can't be null`)
          }
       } else {
          //need changing error for different fields
          // dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': messages}}))
          const messages = data.messages.length > 0 ? data.messages[0] : 'some error'
          dispatch(stopSubmit('profile-data', {_error: messages}))
          return Promise.reject(messages)
       }
    }

//Type

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


