import {ThunkDispatch} from 'redux-thunk'
import {AppStateType, BaseThunkType, InferActionsTypes} from './store'
import {authAPI} from '../api/auth-api'
import {ResultCodes} from '../api/api'
import {chatAPI, ChatMessageType} from '../api/chat-api';
import {Dispatch} from 'redux';

let initializeState = {
    messages: [] as ChatMessageType[]
}

export const chatReducer = (state: AuthInitStateType = initializeState, action: ActionsType): AuthInitStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

//Action
export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/CHAT/MESSAGES_RECEIVED',
        payload: {messages},
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

//Thunk
export const startMessagesListening = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        chatAPI.start()
        await chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }

export const stopMessagesListening = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        await chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
        chatAPI.stop()
    }

export const sendMessage = (message: string): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        await chatAPI.sendMessage(message)
    }

export type AuthInitStateType = typeof initializeState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

