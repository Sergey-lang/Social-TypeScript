import React from 'react';
import {addPost, changingPostText, ProfilePageInitType} from '../../../Redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {GlobalStateType} from '../../../Redux/redux-store';

export type MapStateType = {
  profilePage: ProfilePageInitType
}
export type MapDispatchType = {
  addPost: () => void
  changingPostText: (postText: string) => void
}

const mapState = (state: GlobalStateType): MapStateType => ({profilePage: state.profileState})

export const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, GlobalStateType>
(mapState, {addPost, changingPostText})(MyPosts)
