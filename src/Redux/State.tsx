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
    sidebar: any
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

//Action creators const
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello I am props.', likeCount: 21},
                {id: 2, message: 'I am very handsome props', likeCount: 10},
                {id: 3, message: 'I go out from mypost component', likeCount: 5},
            ],
            newPostText: '',
        },
        dialogPage: {
            dialogs: [
                {id: 1, name: 'Dima Ivanov'},
                {id: 2, name: 'Egor Andreev'},
                {id: 3, name: 'Sergey Titov'},
                {id: 4, name: 'Anton Serov'},
                {id: 5, name: 'Mariya Vinogradova'},
                {id: 6, name: 'Alex Moroz'},
            ],
            messages: [
                {id: 1, message: 'Detract yet delight written farther'},
                {id: 2, message: 'An stairs as be lovers'},
                {id: 3, message: 'Unpleasant in in insensible favourable'},
                {id: 4, message: 'Called though excuse'},
                {id: 5, message: 'Called though.'},
                {id: 6, message: 'Ha-ha-ha...come on.'},],
            newMessageText: ''
        },
        sidebar: {}
    },

    getState() {
        return this._state
    },
    subscriber(observerCallback) {
        this._callSubscriber = observerCallback
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost: PostType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likeCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newPostText
            this._callSubscriber()
        } else if (action.type === ADD_NEW_MESSAGE) {
            const newMessage: MessageType = {
                id: 5,
                message: this._state.dialogPage.newMessageText
            }
            this._state.dialogPage.messages.push(newMessage)
            this._state.dialogPage.newMessageText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogPage.newMessageText = action.newMessageText
            this._callSubscriber()
        }
    },

    _callSubscriber() {
        console.log('state changed')
    }
}

//Action creators
export const AddPostAC = () => {
    return {
        type: ADD_POST
    } as const
}
export const UpdateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newPostText: text
    } as const
}

export const AddMessageAC = () => {
    return {
        type: ADD_NEW_MESSAGE
    } as const
}
export const UpdateNewMessageTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessageText: text
    } as const
}



