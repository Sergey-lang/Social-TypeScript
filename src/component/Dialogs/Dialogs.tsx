import React from 'react';
import style from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {AddMessage} from './AddMessage/AddMessage';
import {ActionsTypes, DialogPageType} from '../../essences/essences';

type DialogsPropsType = {
    dialogPage: DialogPageType
    dispatch: (action: ActionsTypes) => void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogsElement = props.dialogPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)
    let messagesElement = props.dialogPage.messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)

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
                            dispatch={props.dispatch}
                />
            </div>
        </div>
    )
}
