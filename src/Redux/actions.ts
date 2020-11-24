import {addPost, getUserStatus, setOwnProfileStatus, setUserProfileData} from './profile-reducer';
import {addMessage} from './dialogs-reducer';
import {
   followSuccess,
   setCurrentPage,
   setUsers,
   setUsersTotalCount,
   toggleFollowingProgress,
   toggleIsFetching,
   unfollowSuccess
} from './users-reducer';
import {setUserData} from './auth-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';

export type ActionsTypes =
   ReturnType<typeof addPost>
   | ReturnType<typeof addMessage>
   | ReturnType<typeof followSuccess>
   | ReturnType<typeof unfollowSuccess>
   | ReturnType<typeof setUsers>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setUsersTotalCount>
   | ReturnType<typeof toggleIsFetching>
   | ReturnType<typeof setUserProfileData>
   | ReturnType<typeof setUserData>
   | ReturnType<typeof toggleFollowingProgress>
   | ReturnType<typeof getUserStatus>
   | ReturnType<typeof setOwnProfileStatus>

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>