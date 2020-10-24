import React from 'react';
import {addPost, ProfilePageInitType, updateNewPostText} from '../../../Redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../Redux/redux-store';
import {Dispatch} from 'redux';

type MapStateType = {
  profilePage: ProfilePageInitType
}
type MapDispatchType = {
  addPost: () => void
  changingPostText: (postText: string) => void
}

const mapState = (state: AppStateType): MapStateType => {
  return {
    profilePage: state.profileState
  }
}

const mapDispatch = (dispatch: Dispatch): MapDispatchType => {
  return {
    addPost: () => {
      dispatch(addPost())
    },
    changingPostText: (postText: string) => {
      dispatch(updateNewPostText(postText))
    }
  }
}

export const MyPostsContainer = connect(mapState, mapDispatch)(MyPosts)
