import {AuthInitStateType, authReducer, actions} from '../auth-reducer'

let startState: AuthInitStateType

beforeEach(() => {
   startState = {
      id: null as (number | null),
      email: null as string | null,
      login: null as string | null,
      isAuth: false,
      captchaUrl: null as string | null
   }
})

test('used should be is authorized', () => {
   const endState = authReducer(startState, actions.setUserData(846, 'blabla@bla.bla', 'Sergey', true))
   expect(endState.email).toEqual('blabla@bla.bla')
   expect(endState.id).toEqual(846)
   expect(endState.login).toBe('Sergey')
   expect(endState.isAuth).toBeTruthy()
})

test('used should be logout', () => {
   const endState = authReducer(startState, actions.setUserData(null, null, null, false))
   expect(endState.id).toBe(null)
   expect(endState.email).toBe(null)
   expect(endState.login).toBe(null)
   expect(endState.isAuth).toBeFalsy()
})


