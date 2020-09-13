import React from 'react';
import style from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogPageType} from '../../Redux/State';
import {AddMessage} from './AddMessage/AddMessage';

type DialogsPropsType = {
    dialogPage: DialogPageType
    addNewMessage: () => void
    updateNewMessageText: (changedMessageText: string) => void
}

export function Dialogs(props: DialogsPropsType) {

    let dialogsElement = props.dialogPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id} />)
    let messagesElement = props.dialogPage.messages.map(m => <Message id={m.id} message={m.message} key={m.id} />)

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
                <AddMessage newMessageText={props.dialogPage.newMessageText}
                    addNewMessage={props.addNewMessage}
                            updateNewMessageText={props.updateNewMessageText}
                />
            </div>
        </div>
    )
}
