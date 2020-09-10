import React from 'react';
import style from './AddMessage.module.css';

type AddMessageType = {
    addNewMessage: (messageText: string) => void
}

export function AddMessage(props: AddMessageType) {
    
    let newMessageRef = React.createRef<HTMLTextAreaElement>()
    let addMessage = () => {
        if (newMessageRef.current) {
            props.addNewMessage(newMessageRef.current.value)
            newMessageRef.current.value = '';
        }
    }

    return (
        <div className={style.add_new_message}>
            <div className={style.area_wrapper}>
                <textarea ref={newMessageRef} placeholder='What is new?' className={style.area}></textarea>
            </div>
            <div className={style.button_wrapper}>
                <button className={style.add_message_button} onClick={addMessage}>Add post</button>
            </div>
        </div>
    )
}
