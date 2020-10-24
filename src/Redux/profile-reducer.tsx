import React from 'react';
import {ActionsTypes} from '../essences/essences';
import {UsersType} from './users-reducer';

enum ActionType {
  ADD_POST = 'PROFILE/ADD-POST',
  UPDATE_NEW_POST_TEXT = 'PROFILE/UPDATE-NEW-POST-TEXT',
  SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE',
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
  aboutMe: UsersType
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
}

let initializeState: ProfilePageInitType = {
  posts: [
    {id: 1, message: 'Hello I am props.', likeCount: 21},
    {id: 2, message: 'I am very handsome props', likeCount: 10},
    {id: 3, message: 'I go out from my post component', likeCount: 5},
  ],
  newPostText: '',
  profile: null as ProfileType | null
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
        posts: [...state.posts, newPost],
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
type SetUserProfile = {
  type: ActionType.SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfile =>
  ({type: ActionType.SET_USER_PROFILE, profile})

