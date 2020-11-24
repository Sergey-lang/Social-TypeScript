import {AuthInitPageType, authReducer, setUserData} from '../auth-reducer';

let startState: AuthInitPageType

beforeEach(() => {
    startState = {
        id: null,
        email: null,
        login: null,
        isAuth: false,
    }
})

test('used should be is authorized', () => {
    const endState = authReducer(startState, setUserData(2, 'blabla@bla.bla', 'samurai', true))
    expect(endState.isAuth).toBeTruthy()
    expect(endState.email).toEqual('blabla@bla.bla')
    expect(endState.id).toBe(2)
    expect(endState.login).toBe('samurai')
});
