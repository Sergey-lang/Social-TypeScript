import {
    followSuccess,
    toggleFollowingProgress,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unfollowSuccess
} from '../Redux/users-reducer';
import {setUserData} from '../Redux/auth-reducer';
import {addPost, changingPostText, setUserProfile} from '../Redux/profile-reducer';
import {addMessage, updateNewMessageText} from '../Redux/dialogs-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../Redux/redux-store';

export type ActionsTypes =
    | ReturnType<typeof addPost>
    | ReturnType<typeof changingPostText>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof updateNewMessageText>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleFollowingProgress>

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
