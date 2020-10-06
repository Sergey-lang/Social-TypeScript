import {AddMessageAC, DialogsInitializeStateType, dialogsReducer} from './dialogs-reducer';
import {AddPostAC, ProfileInitializeStateType, profileReducer} from './profile-reducer';

test('reducer should be add new post', () => {

    type StartStateType = ProfileInitializeStateType

    const startState: ProfileInitializeStateType = {
        posts: [
            {id: 1, message: 'Hello I am props.', likeCount: 21}
        ],
        newPostText: '',
    }

    const endState = profileReducer(startState, AddPostAC())
    expect(endState.posts.length).toBe(2)
});

test('reducer should be change post message', () => {

    const newTestPostText: string = 'New post text here'
    const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
    type StartStateType = ProfileInitializeStateType

    const UpdateNewPostTextAC = (newTestPostText: string) =>
        ({type: UPDATE_NEW_POST_TEXT, newPostText: newTestPostText}) as const

    const startState: ProfileInitializeStateType = {
        posts: [
            {id: 1, message: 'Hello I am props.', likeCount: 21}
        ],
        newPostText: '',
    }

    const endState = profileReducer(startState, UpdateNewPostTextAC(newTestPostText))

    expect(endState.newPostText).toBe('New post text here')
    expect(endState.newPostText.trim().length).toBe(18)
});