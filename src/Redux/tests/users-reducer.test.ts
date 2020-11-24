import {followSuccess, unfollowSuccess, UsersInitializeStateType, usersReducer} from '../users-reducer';

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
        followingInProgress: []
    }
})

test('check user follow', () => {

    const endState = usersReducer(startState, followSuccess(1))
    expect(endState.users[0].followed).toBeTruthy()
});

test('check user unfollow', () => {

    const endState = usersReducer(startState, unfollowSuccess(1))
    expect(endState.users[1].followed).toBeTruthy()
});
