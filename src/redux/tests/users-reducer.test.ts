import {
   followSuccess,
   setCurrentPage,
   setUsers, toggleFollowingProgress, toggleIsFetching,
   unfollowSuccess,
   UsersInitializeStateType,
   usersReducer
} from '../users-reducer';

let startState: UsersInitializeStateType

beforeEach(() => {
   startState = {
      users: [
         {
            id: 1,
            name: 'David Ivanov',
            status: 'I am test men',
            photos: {
               small: 'image',
               large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
            },
            followed: false
         },
         {
            id: 2,
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

test('check user follow', () => {

   const endState = usersReducer(startState, followSuccess(1))
   expect(endState.users[0].followed).toBeTruthy()
});

test('check user unfollow', () => {

   const endState = usersReducer(startState, unfollowSuccess(1))
   expect(endState.users[1].followed).toBeTruthy()
});

test('set users data', () => {

   const endState = usersReducer(startState, setUsers(usersArray))
   expect(endState.users[0].name).toBe('Sergey Ivanov')
   expect(endState.users[0].status).toBe('Test status')
   expect(endState.users[1].id).toBe(46)
   expect(endState.users[1].status).toBe('Test status 2')
});

test('toggle is fetching', () => {

   const endState = usersReducer(startState, toggleIsFetching(true))
   expect(endState.isFetching).toBeTruthy()
});
