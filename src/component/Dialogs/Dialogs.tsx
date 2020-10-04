import React, {ChangeEvent} from 'react';
import style from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogPageType} from '../../essences/essences';

type DialogsPropsType = {
    dialogsPage: DialogPageType
    sendMessageCallback: () => void
    changingMessageTextCallback: (newMessageText:string) => void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsElement = props.dialogsPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)
    let messagesElement = props.dialogsPage.messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)

    const sendMessage = () => {
        props.sendMessageCallback()
    }
    const changingMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageText = e.currentTarget.value
        props.changingMessageTextCallback(newMessageText)
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
                <textarea value={props.dialogsPage.newMessageText}
                          onChange={changingMessageText}
                          placeholder='What is new?'
                          className={style.area}></textarea>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.add_message_button} onClick={sendMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
