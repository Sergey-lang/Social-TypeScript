import {addPost, ProfilePageInitType, profileReducer} from '../profile-reducer';

let startState: ProfilePageInitType
beforeEach(() => {
    startState = {
        posts: [
            {id: 1, message: 'Hello I am props.', likeCount: 21},
            {id: 2, message: 'I am very handsome props', likeCount: 10},
            {id: 3, message: 'I go out from my post component', likeCount: 5},
        ],
        profile: {
            aboutMe: 'I am',
            contacts: {
                facebook: 'www.face.@mail.ru',
                website: 'www.it.com',
                vk: 'vk.com',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: '',
            },
            lookingForAJob: true,
            lookingForAJobDescription: 'Very very',
            fullName: 'Sergey',
            userId: 5,
            photos: {
                small: 'string | null',
                large: 'string | null'
            }
        },
        status: ''
    }
})

test('reducer should be add new post', () => {

    const postMessage = 'This is new post text from redux-form'

    const endState = profileReducer(startState, addPost(postMessage))
    expect(endState.posts.length).toBe(4)
});
