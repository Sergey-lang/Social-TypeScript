import React, {ChangeEvent} from 'react';
import style from './AddMessage.module.css';
import {ActionsTypes} from '../../../Redux/State';

type AddMessageType = {
    newMessageText: string
    dispatch: (action: ActionsTypes) => void
}

export const AddMessage: React.FC<AddMessageType> = (props) => {

    const addMessage = () => {
        props.dispatch({type: 'ADD-NEW-MESSAGE'})
    }
    const changingMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: 'UPDATE-NEW-MESSAGE-TEXT', newMessageText: e.currentTarget.value})
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
                <button className={style.add_message_button} onClick={addMessage}>Send message</button>
            </div>
        </div>
    )
}
