import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api';
import { Dispatch } from 'redux';
import { BaseThunkType, InferActionsTypes } from '../app/store';
import { v1 } from 'uuid';

export type ChatMessageType = ChatMessageAPIType & { id: string }

let initializeState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

export const chatReducer = (state: AuthInitStateType = initializeState, action: ActionsType): AuthInitStateType => {
  switch (action.type) {
    case 'SN/CHAT/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages
          .map(m => ({ ...m, id: v1() }))]
          .filter((m, idx, arr) => idx >= arr.length - 100)
      };
    case 'SN/CHAT/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status
      };
    default:
      return state;
  }
};

//Action
export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => ({
    type: 'SN/CHAT/MESSAGES_RECEIVED',
    payload: { messages },
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'SN/CHAT/STATUS_CHANGED',
    payload: { status },
  } as const)
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }

  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }

  return _statusChangedHandler;
};

//Thunk
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType =>
  async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
  };

export const sendMessage = (message: string): ThunkType =>
  async (dispatch) => {
    await chatAPI.sendMessage(message);
  };

export type AuthInitStateType = typeof initializeState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

