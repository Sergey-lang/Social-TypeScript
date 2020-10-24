import {addPost, setUserProfile, updateNewPostText} from '../Redux/profile-reducer';
import {addMessage, updateNewMessageText} from '../Redux/dialogs-reducer';
import {follow, setCurrentPage, setUsers, setUsersTotalCount, toggleIsFetching, unfollow} from '../Redux/users-reducer';

export type ActionsTypes = ReturnType<typeof addPost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof updateNewMessageText>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>


