import React, {useEffect, useState} from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

export const Chat: React.FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    )
}

export const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, i) => <Message message={m} key={i}/>)}
        </div>
    )
}

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img src={message.photo} width={30} alt=""/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

export const AddMessage: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }


    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage