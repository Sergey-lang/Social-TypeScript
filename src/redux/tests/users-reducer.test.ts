import {
   UsersInitializeStateType,
   usersReducer,
   actions
} from '../users-reducer'

let startState: UsersInitializeStateType

beforeEach(() => {
   startState = {
      users: [
         {
            id: 0,
            name: 'David Ivanov',
            status: 'I am test men',
            photos: {
               small: 'image',
               large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
            },
            followed: false
         },
         {
            id: 1,
            name: 'Bob Ivanov',
            status: 'I am test men',
            photos: {
               small: 'image',
               large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
            },
            followed: true
         },
      ],
      totalUsersCount: 0,
      pageSize: 5,
      currentPage: 5,
      isFetching: false,
      followingInProgress: [1, 2]
   }
})

test('check user follow', () => {

   const endState = usersReducer(startState, actions.followSuccess(0))

   expect(endState.users[0].followed).toBeTruthy()
   expect(endState.users[1].followed).toBeTruthy()
})

test('check user unfollow', () => {

   const endState = usersReducer(startState, actions.unfollowSuccess(1))

   expect(endState.users[0].followed).toBeFalsy()
   expect(endState.users[1].followed).toBeFalsy()
})

test('set users data', () => {

   const usersArray = [
      {
         id: 45,
         name: 'Sergey Ivanov',
         status: 'Test status',
         photos: {
            small: 'image',
            large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
         },
         followed: false
      },
      {
         id: 46,
         name: 'Egor Ivanov',
         status: 'Test status 2',
         photos: {
            small: 'image',
            large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
         },
         followed: true
      },
   ]

   const endState = usersReducer(startState, actions.setUsers(usersArray))
   expect(endState.users[0].name).toBe('Sergey Ivanov')
   expect(endState.users[0].status).toBe('Test status')
   expect(endState.users[1].id).toBe(46)
   expect(endState.users[1].status).toBe('Test status 2')
})

test('toggle is fetching', () => {

   const endState = usersReducer(startState, actions.toggleIsFetching(true))
   expect(endState.isFetching).toBeTruthy()
})
