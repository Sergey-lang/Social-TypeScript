import React from 'react';
import {ActionsTypes, ThunkType} from '../essences/essences';
import {ThunkDispatch} from 'redux-thunk';
import {GlobalStateType} from './redux-store';
import {profileAPI} from '../API/profile-api';

let initializeState: ProfilePageInitType = {
   posts: [
      {id: 1, message: 'Hello I am props.', likeCount: 21},
      {id: 2, message: 'I am very handsome props', likeCount: 10},
      {id: 3, message: 'I go out from my post component', likeCount: 5},
   ],
   newPostText: '',
   profile: null as ProfileType | null,
   status: ''
}

export const profileReducer = (state: ProfilePageInitType = initializeState,
                               action: ActionsTypes): ProfilePageInitType => {
   switch (action.type) {
      case ActionType.ADD_POST:
         const newPost: PostType = {
            id: 5,
            message: state.newPostText,
            likeCount: 0
         }
         return {
            ...state,
            posts: [newPost, ...state.posts],
            newPostText: ''
         }
      case ActionType.UPDATE_NEW_POST_TEXT:
         return {
            ...state,
            newPostText: action.newPostText
         }
      case ActionType.SET_USER_PROFILE:
         return {
            ...state,
            profile: action.profile
         }
      case ActionType.GET_USER_STATUS:
         return {
            ...state,
            status: action.userStatus
         }
      case ActionType.UPDATE_PROFILE_STATUS:
         return {
            ...state,
            status: action.status
         }
      default:
         return state
   }
}

type AddPostACType = {
   type: ActionType.ADD_POST
}
export const addPost = (): AddPostACType =>
   ({type: ActionType.ADD_POST})
type UpdateNewPostTextACType = {
   type: ActionType.UPDATE_NEW_POST_TEXT
   newPostText: string
}
export const changingPostText = (text: string): UpdateNewPostTextACType =>
   ({type: ActionType.UPDATE_NEW_POST_TEXT, newPostText: text})

//set Profile Data
type SetUserProfile = {
   type: ActionType.SET_USER_PROFILE
   profile: ProfileType
}

export const setUserProfileData = (profile: ProfileType): SetUserProfile =>
   ({type: ActionType.SET_USER_PROFILE, profile})


//Status get Other and set Yourself
type GetUserStatus = {
   type: ActionType.GET_USER_STATUS
   userStatus: string
}

export const getUserStatus = (userStatus: string): GetUserStatus =>
   ({type: ActionType.GET_USER_STATUS, userStatus: userStatus})

type SetOwnProfileStatus = {
   type: ActionType.UPDATE_PROFILE_STATUS
   status: string
}
export const setOwnProfileStatus = (status: string): SetOwnProfileStatus =>
   ({type: ActionType.UPDATE_PROFILE_STATUS, status})


//Thunks
export const getUserProfileData = (userId: number): ThunkType => {
   return (dispatch: ThunkDispatch<GlobalStateType, unknown, ActionsTypes>) => {
      profileAPI.getProfile(userId)
         .then(data => {
            dispatch(setUserProfileData(data))
         })
   }
}

export const getStatusFromUser = (userId: number): ThunkType => {
   return (dispatch: ThunkDispatch<GlobalStateType, unknown, ActionsTypes>) => {
      profileAPI.getUserStatus(userId)
         .then(res => {
            dispatch(getUserStatus(res.data))
         })
   }
}

export const updateOwnProfileStatus = (status: string): ThunkType => {
   return (dispatch: ThunkDispatch<GlobalStateType, unknown, ActionsTypes>) => {
      profileAPI.updateOwnProfileStatus(status)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(setOwnProfileStatus(status))
            }
         })
   }
}

enum ActionType {
   ADD_POST = 'PROFILE/ADD-POST',
   UPDATE_NEW_POST_TEXT = 'PROFILE/UPDATE-NEW-POST-TEXT',
   SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE',
   GET_USER_STATUS = 'PROFILE/GET-USER-STATUS',
   UPDATE_PROFILE_STATUS = 'PROFILE/UPDATE-PROFILE-STATUS',
}

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
   newPostText: string
   profile: ProfileType | null
   status: string
}

