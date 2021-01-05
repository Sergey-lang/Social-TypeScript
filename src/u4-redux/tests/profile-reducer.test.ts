import {profileReducer, actions, ProfileInitialStateType} from '../profile-reducer'

let startState: ProfileInitialStateType
beforeEach(() => {
   startState = {
      posts: [
         {id: 1, message: 'Hello I am props.', likeCount: 21},
         {id: 2, message: 'I am very handsome props', likeCount: 10},
         {id: 3, message: 'I go out from my post u3-pages', likeCount: 5},
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

test('add new post in own wall', () => {

   const postMessage = 'This is new post text from u4-redux-form'

   const endState = profileReducer(startState, actions.addPost(postMessage))
   expect(endState.posts.length).toBe(4)
})

test('get status from another user', () => {

   const status = 'New status from user'

   const endState = profileReducer(startState, actions.getUserStatus(status))
   expect(endState.status).toBe('New status from user')
})

test('set own status in profile', () => {

   const ownStatus = 'Own status in profile status'

   const endState = profileReducer(startState, actions.setOwnProfileStatus(ownStatus))
   expect(endState.status).toBe('Own status in profile status')
})
