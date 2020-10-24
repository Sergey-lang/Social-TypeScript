import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {mapDispatchType, MapStateType} from './DialogsContainer';

type OwnPropsType = MapStateType & mapDispatchType
export const Dialogs: React.FC<OwnPropsType> = ({dialogsPage, addMessage, updateNewMessageText}) => {

  let dialogsElement = dialogsPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)
  let messagesElement = dialogsPage.messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)

  const sendMessageCallback = () => {
    addMessage()
  }
  const changingMessageTextCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newMessageText = e.currentTarget.value
    updateNewMessageText(newMessageText)
  }

  return (
    <div className={s.dialogs_container}>
      <div className={s.my_dialogs_headline}>Dialogs</div>
      <div className={s.message_page}>
        <div className={s.dialogs_wrapper}>
          {dialogsElement}
        </div>
        <div className={s.messages_wrapper}>
          <div className={s.message_block}>
            {messagesElement}
          </div>
          <div className={s.add_new_message}>
            <div className={s.area_wrapper}>
                <textarea value={dialogsPage.newMessageText}
                          onChange={changingMessageTextCallback}
                          placeholder='What is new?'
                          className={s.area}></textarea>
            </div>
            <div className={s.button_wrapper}>
              <button className={s.add_message_button} onClick={sendMessageCallback}>Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
