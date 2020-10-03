import React from 'react';
import {StoreReduxType} from '../../../Redux/redux-store';
import {AddPostAC, UpdateNewPostTextAC} from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';

type MyPostsType = {
    store: StoreReduxType
}

export const MyPostsContainer: React.FC<MyPostsType> = (props) => {
    let profilePage = props.store.getState().profileReducer
    const addPost = () => {
        props.store.dispatch(AddPostAC())
    }
    const changingPostText = (postText: string) => {
        props.store.dispatch(UpdateNewPostTextAC(postText))
    }

    return (
        <MyPosts profilePage={profilePage}
                 addPostCallback={addPost}
                 changingPostTextCallback={changingPostText}
        />
    )
}

export default MyPosts;