import {followAC, unfollowAC, UsersInitializeStateType, usersReducer} from './users-reducer';

test('check user follow', () => {

    const startState: UsersInitializeStateType = {
        users: [
            {
                id: 1,
                name: 'Dima Ivanov',
                status: 'I am a bos',
                photos: {
                    small: 'sdsd',
                    large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
                },
                followed: false
            }
        ]
    }

    const endState = usersReducer(startState, followAC(1))
    expect(endState.users[0].followed).toBe(false)
});

test('check user unfollow', () => {

    const startState: UsersInitializeStateType = {
        users: [
            {
                id: 1,
                name: 'Anna Ivanova',
                status: 'I am a girl',
                photos: {
                    small: 'sdsd',
                    large: 'https://escworks.co.in/wp-content/uploads/2012/07/user-icon-6.png'
                },
                followed: true
            }
        ]
    }

    const endState = usersReducer(startState, unfollowAC(1))
    expect(endState.users[0].followed).toBe(true)
});
