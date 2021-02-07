import React, {useEffect, useState} from 'react';

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
    //web socket object which set after creat.At start == null. Availability for other.
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    //after render in chat use Effect create socket
    //there is one problem! You can't connect because render happened earlier!
    useEffect(() => {
        //our channel type
        let ws: WebSocket;
        //---show close and create new channel
        const closeHandler = () => {
            console.log('CLOSE WS')
            //reconnect
            setTimeout(createChannel, 3000)
        }
        //2----call
        function createChannel() {
            //before create new socket we can clear old listener
            ws?.removeEventListener('close', closeHandler)
            //close ws channel
            ws?.close()

            //3----create channel
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            //4----subscribe on close(we can know)
            ws?.addEventListener('close', closeHandler)
            //5----set ws channel in local state
            setWsChannel(ws)
        }
        //1----create channel after render
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }

    }, [wsChannel])

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

export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    //textarea changer
    const [message, setMessage] = useState('')
    //ws status, use for button
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {

        let openHandler = () => {
            setReadyStatus('ready')
        }
        //check ws and add listener, set status 'READY'
        wsChannel?.addEventListener('open', openHandler)

        //remove listener after close
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <button onClick={sendMessage} disabled={wsChannel === null || readyStatus !== 'ready'}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage