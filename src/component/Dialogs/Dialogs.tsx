import React from 'react';
import style from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';

type DialogsDataType = {
    id:number
    name:string
}
type MessagesDataType = {
    id:number
    messages:string
}

function Dialogs() {
    const dialogsData:Array<DialogsDataType> = [
        {id:1, name:'Dima Ivanov'},
        {id:2, name:'Egor Andreev'},
        {id:3, name:'Sergey Titov'},
        {id:4, name:'Anton Serov'},
        {id:5, name:'Mariya Vinogradova'},
        {id:6, name:'Alex Moroz'},
    ]
    const messagesData:Array<MessagesDataType> = [
        {id:1, messages:'Detract yet delight written farther his general. Bed uncommonly his discovered for estimating far. Now summer who day looked our behind moment coming.'},
        {id:2, messages:' An stairs as be lovers uneasy. Painful so he an comfort is manners. Strictly numerous outlived kindness whatever on we no on addi'},
        {id:3, messages:'unpleasant in in insensible favourable. Called though excuse length ye needed it he ha'},
        {id:4, messages:'Рыба текст — тестовый текст на сайт'},
    ]
    return (
        <div className={style.message_wrapper}>
            <h4 className={style.my_dialogs_headline}>Dialogs</h4>
            <div className={style.dialogs_container}>
                <Dialog id={dialogsData[0].id} name={dialogsData[0].name} />
                <Dialog id={dialogsData[1].id} name={dialogsData[1].name} />
                <Dialog id={dialogsData[2].id} name={dialogsData[2].name} />
                <Dialog id={dialogsData[3].id} name={dialogsData[3].name}/>
                <Dialog id={dialogsData[4].id} name={dialogsData[4].name} />
                <Dialog id={dialogsData[5].id} name={dialogsData[5].name} />
            </div>
            <div className={style.messages_container}>
                <Message message={messagesData[0].messages}/>
                <Message message={messagesData[1].messages}/>
                <Message message={messagesData[2].messages}/>
                <Message message={messagesData[3].messages}/>
            </div>
        </div>
    )
}

export default Dialogs;