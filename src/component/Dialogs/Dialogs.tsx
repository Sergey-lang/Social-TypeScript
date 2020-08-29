import React from 'react';
import style from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

type DialogsDataType = {
    id: number
    name: string
}
type MessagesDataType = {
    id: number
    messages: string
}

function Dialogs() {
    const dialogs: Array<DialogsDataType> = [
        {id: 1, name: 'Dima Ivanov'},
        {id: 2, name: 'Egor Andreev'},
        {id: 3, name: 'Sergey Titov'},
        {id: 4, name: 'Anton Serov'},
        {id: 5, name: 'Mariya Vinogradova'},
        {id: 6, name: 'Alex Moroz'},
    ]

    const messages: Array<MessagesDataType> = [
        {id: 1, messages: 'Detract yet delight written farther his general. Bed uncommonly his discovered for estimating            far.Now summer who day looked our behind moment coming.'
        },
        {id: 2, messages: ' An stairs as be lovers uneasy. Painful so he an comfort is manners. Strictly numerous outlived          kindness whatever on we no on addi.'
        },
        {id: 3, messages: 'Unpleasant in in insensible favourable. Called though excuse length ye needed it he ha'},
        {id: 4, messages: 'Called though excuse length ye needed it he ha.'},
        {id: 5, messages: 'Called though.'},
        {id: 6, messages: 'Ha-ha-ha...come on.'},
    ]

    let dialogsElement = dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)
    let messagesElement = messages.map(m => <Message id={m.id} message={m.messages} key={m.id}/>)

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
                <div className={style.add_message_block}>
                    <div>
                        <textarea placeholder='What is new?' className={style.area}></textarea>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.add_message_button}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;