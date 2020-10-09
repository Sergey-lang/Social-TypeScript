import React from 'react';
import {AddPostAC, UpdateNewPostTextAC} from '../../../Redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../Redux/redux-store';
import {ProfilePageType} from '../../../essences/essences';

type MapStateType = {
    profilePage: ProfilePageType
}
type MapDispatchType = {
    addPost: () => void
    changingPostText: (postText: string) => void
}

const mapState = (state: AppStateType): MapStateType => {
    return {
        profilePage: state.profileReducer
    }
}

const mapDispatch = (dispatch: any): MapDispatchType => {
    return {
        addPost: () => {
            dispatch(AddPostAC())
        },
        changingPostText: (postText: string) => {
            dispatch(UpdateNewPostTextAC(postText))
        }
    }
}

export const MyPostsContainer = connect(mapState, mapDispatch)(MyPosts)
