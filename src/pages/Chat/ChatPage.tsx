import React, {useEffect, useState} from 'react';
import {ChatMessageType} from '../../api/chat-api';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer';
import s from './ChatPage.module.scss'
import {AppStateType} from '../../app/store';

const ChatPage: React.FC = () => {
    return (
        <div className={s.chat_page}>
            <Chat/>
        </div>
    )
}

export const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div className={s.messages_block}>
            {messages.map((m, i) => <Message message={m} key={i}/>)}
        </div>
    )
}

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div className={s.message}>
            <div className={s.topic_data}>
                <img src={message.photo}/>
                <span className={s.user_name}>{message.userName}</span>
                <em>Developer</em>
            </div>
            <div className={s.topic_detail}>
                {message.message}
            </div>
        </div>
    )
}

export const AddMessageForm: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    // const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <button onClick={sendMessageHandler} disabled={false}>Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage
