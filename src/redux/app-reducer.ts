import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './store';
import {getAuthUserData} from './auth-reducer';

export type AppInitPageType = {
   initialized: boolean
}

let initializeState: AppInitPageType = {
   initialized: false
}

export const appReducer = (state: AppInitPageType = initializeState, action: ActionsType): AppInitPageType => {
   switch (action.type) {
      case 'APP/INITIALIZED_SUCCESS':
         return {...state,initialized: true}
      default:
         return state
   }
}

//Action
export const initializedSuccess = () => ({
   type: 'APP/INITIALIZED_SUCCESS',
} as const)

//Thunk
export const initializeApp = (): ThunkType =>
   (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
   let promise = dispatch(getAuthUserData)
      Promise.all([promise])
         .then(()=>{
         dispatch(initializedSuccess)
      })
}

//Type
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ActionsType = ReturnType<typeof initializedSuccess>



