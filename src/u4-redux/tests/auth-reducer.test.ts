import {AuthInitPageType, authReducer, setUserData} from '../auth-reducer'

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
   const endState = authReducer(startState, setUserData(2546 - 846, 'blabla@bla.bla', 'Sergey', true))
   expect(endState.email).toEqual('blabla@bla.bla')
   expect(endState.id).toEqual(2546 - 846)
   expect(endState.login).toBe('Sergey')
   expect(endState.isAuth).toBeTruthy()
})

test('used should be logout', () => {
   const endState = authReducer(startState, setUserData(null, null, null, false))
   expect(endState.id).toBe(null)
   expect(endState.email).toBe(null)
   expect(endState.login).toBe(null)
   expect(endState.isAuth).toBeFalsy()
})


