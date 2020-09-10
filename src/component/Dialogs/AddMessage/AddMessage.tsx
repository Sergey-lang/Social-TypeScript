import React, {ChangeEvent} from 'react';
import style from './AddMessage.module.css';

type AddMessageType = {
    newMessageText: string
    addNewMessage: () => void
    updateNewMessageText: (changedMessageText: string) => void
}

export function AddMessage(props: AddMessageType) {

    const addMessage = () => {
        props.addNewMessage()
    }
    const changingMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }

    return (
        <div className={style.add_new_message}>
            <div className={style.area_wrapper}>
                <textarea value={props.newMessageText}
                          onChange={changingMessageText}
                          placeholder='What is new?'
                          className={style.area}></textarea>
            </div>
            <div className={style.button_wrapper}>
                <button className={style.add_message_button} onClick={addMessage}>Add post</button>
            </div>
        </div>
    )
}
