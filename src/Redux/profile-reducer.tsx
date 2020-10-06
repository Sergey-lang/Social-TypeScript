import React from 'react';
import {ActionsTypes, PostType} from '../essences/essences';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

type AddPostACType = {
    type: typeof ADD_POST
}
type UpdateNewPostTextACType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newPostText: string
}

export type ProfileInitializeStateType = typeof profileInitializeState

let profileInitializeState = {
    posts: [
        {id: 1, message: 'Hello I am props.', likeCount: 21},
        {id: 2, message: 'I am very handsome props', likeCount: 10},
        {id: 3, message: 'I go out from my post component', likeCount: 5},
    ] as Array<PostType>,
    newPostText: '',
}

export const profileReducer = (state: ProfileInitializeStateType = profileInitializeState,
                               action: ActionsTypes): ProfileInitializeStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likeCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText
            return state
        default:
            return state
    }
}

//ActionCreators
export const AddPostAC = (): AddPostACType =>
    ({type: ADD_POST}) as const

export const UpdateNewPostTextAC = (text: string): UpdateNewPostTextACType =>
    ({type: UPDATE_NEW_POST_TEXT, newPostText: text}) as const

