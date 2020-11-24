import React from 'react';
import {addPost, ProfilePageInitType} from '../../../Redux/profile-reducer';
import {MyPosts, PostFormValuesType} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../Redux/redux-store';

export type MapStateType = {
   profilePage: ProfilePageInitType
}
export type MapDispatchType = {
   addPost: (postNewMessage: string) => void
}

const mapState = (state: AppStateType): MapStateType => ({profilePage: state.profileState})

export const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapState, {addPost})(MyPosts)
