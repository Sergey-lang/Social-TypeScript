import {AddPostAC, UpdateNewPostTextAC} from '../Redux/profile-reducer';
import {AddMessageAC, UpdateNewMessageTextAC} from '../Redux/dialogs-reducer';

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
}

export type ActionsTypes = ReturnType<typeof AddPostAC>
    | ReturnType<typeof UpdateNewPostTextAC>
    | ReturnType<typeof AddMessageAC>
    | ReturnType<typeof UpdateNewMessageTextAC>

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    subscriber: (observerCallback: () => void) => void
    _callSubscriber: () => void
    dispatch: (action: ActionsTypes) => void
}

