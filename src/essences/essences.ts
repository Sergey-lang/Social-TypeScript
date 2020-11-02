import {
    follow,
    toggleFollowingProgress,
    setCurrentPage,
    setUsers,
    setUsersTotalCount,
    toggleIsFetching,
    unfollow
} from '../Redux/users-reducer';
import {setUserData} from '../Redux/auth-reducer';
import {addPost, changingPostText, setUserProfile} from '../Redux/profile-reducer';
import {addMessage, updateNewMessageText} from '../Redux/dialogs-reducer';

export type ActionsTypes =
    | ReturnType<typeof addPost>
    | ReturnType<typeof changingPostText>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof updateNewMessageText>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleFollowingProgress>
