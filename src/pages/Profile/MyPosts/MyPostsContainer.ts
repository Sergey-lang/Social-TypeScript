import {MyPosts} from './MyPosts'
import {connect} from 'react-redux'
import {actions, ProfileInitialStateType} from '../../../redux/profile-reducer'
import {AppStateType} from '../../../app/store';

export type MapStateType = {
   profilePage: ProfileInitialStateType
}
export type MapDispatchType = {
   addPost: (postNewMessage: string) => void
}

const mapState = (state: AppStateType): MapStateType => ({profilePage: state.profileState})

export const MyPostsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapState, {addPost: actions.addPost})(MyPosts)
