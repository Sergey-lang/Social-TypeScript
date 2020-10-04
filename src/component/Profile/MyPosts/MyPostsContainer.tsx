import React from 'react';
import {AddPostAC, UpdateNewPostTextAC} from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';
import {StoreContext} from '../../../StoreContext';

export const MyPostsContainer: React.FC = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState()

                    const addPost = () => {
                        store.dispatch(AddPostAC())
                    }
                    const changingPostText = (postText: string) => {
                        store.dispatch(UpdateNewPostTextAC(postText))
                    }
                    return (
                        <MyPosts profilePage={state.profileReducer}
                                 addPostCallback={addPost}
                                 changingPostTextCallback={changingPostText}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    )
}

export default MyPosts;