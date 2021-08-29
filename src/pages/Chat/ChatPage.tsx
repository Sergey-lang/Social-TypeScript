import React, { useEffect, useRef, useState } from 'react';
import { ChatMessageAPIType } from '../../api/chat-api';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import s from './ChatPage.module.scss';
import { AppStateType } from '../../app/store';

const ChatPage: React.FC = () => {
  return (
    <div className={s.chat_page}>
      <Chat/>
    </div>
  );
};

export const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === 'error' && <div>Some error occurred. Please refresh the page.</div>}
      <Messages/>
      <AddMessageForm/>
    </div>
  );
};

export const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(false);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (!isAutoScroll) return;
    messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={s.messages_block} onScroll={scrollHandler}>
      {messages.map((m, i) => <Message message={m} key={m.id}/>)}
      <div ref={messagesAnchorRef}/>
    </div>
  );
};

export const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
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
  );
});

export const AddMessageForm: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
      </div>
      <div>
        <button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
