import React from 'react';
import style from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

function Dialogs() {
    return (
        <div className={style.message_wrapper}>
            <div className={style.dialogs_container}>
                <Dialog/>
            </div>
            <div className={style.messages_container}>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </div>
        </div>
    )
}

export default Dialogs;