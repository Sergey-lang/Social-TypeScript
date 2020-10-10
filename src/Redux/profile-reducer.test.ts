import {AddPostAC, profileReducer} from './profile-reducer';
import {ProfilePageType} from '../essences/essences';

test('reducer should be add new post', () => {

    const startState: ProfilePageType = {
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

    const UpdateNewPostTextAC = (newTestPostText: string) =>
        ({type: UPDATE_NEW_POST_TEXT, newPostText: newTestPostText}) as const

    const startState: ProfilePageType = {
        posts: [
            {id: 1, message: 'Hello I am props.', likeCount: 21}
        ],
        newPostText: '',
    }

    const endState = profileReducer(startState, UpdateNewPostTextAC(newTestPostText))

    expect(endState.newPostText).toBe('New post text here')
    expect(endState.newPostText.trim().length).toBe(18)
});