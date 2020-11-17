import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {mapDispatchType, MapStateType} from './DialogsContainer';
import {Button} from '../../common/Button/Button';
import {TextArea} from '../../common/TextArea/TextArea';

type OwnPropsType = MapStateType & mapDispatchType
export const Dialogs: React.FC<OwnPropsType> = ({dialogsPage, addMessage, updateNewMessageText, ...props}) => {

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
                     <TextArea value={dialogsPage.newMessageText}
                               onChange={changingMessageTextCallback}
                               onEnter={sendMessageCallback}
                               placeholder='What is new?'
                               className={s.area}></TextArea>
                  </div>
                  <div className={s.button_wrapper}>
                     <Button className={s.btn} onClick={sendMessageCallback}>Send message</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
