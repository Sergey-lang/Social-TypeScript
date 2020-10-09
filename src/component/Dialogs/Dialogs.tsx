import React, {ChangeEvent} from 'react';
import style from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogPageType} from '../../essences/essences';

type DialogsPropsType = {
    dialogsPage: DialogPageType
    sendMessage: () => void
    changingMessageText: (newMessageText: string) => void
}

export const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, sendMessage, changingMessageText}) => {

    let dialogsElement = dialogsPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)
    let messagesElement = dialogsPage.messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)

    const sendMessageCallback = () => {
        sendMessage()
    }
    const changingMessageTextCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageText = e.currentTarget.value
        changingMessageText(newMessageText)
    }

    return (
        <div className={style.dialogs_container}>
            <h4 className={style.my_dialogs_headline}>Dialogs</h4>
            <div className={style.dialogs_wrapper}>
                {dialogsElement}
            </div>
            <div className={style.messages_wrapper}>
                <div className={style.message_block}>
                    {messagesElement}
                </div>
                <div className={style.add_new_message}>
                    <div className={style.area_wrapper}>
                <textarea value={dialogsPage.newMessageText}
                          onChange={changingMessageTextCallback}
                          placeholder='What is new?'
                          className={style.area}></textarea>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.add_message_button} onClick={sendMessageCallback}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
