import {addPost, ProfilePageInitType} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';

export type MapStateType = {
   profilePage: ProfilePageInitType
}
export type MapDispatchType = {
   addPost: (postNewMessage: string) => void
}

const mapState = (state: AppStateType): MapStateType => ({profilePage: state.profileState})

export const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapState, {addPost})(MyPosts)
