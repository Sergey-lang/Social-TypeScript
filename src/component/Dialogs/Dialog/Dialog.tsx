import React from 'react';
import style from './Dialog.module.css';
import {NavLink} from 'react-router-dom';

type DialogType = {
    name: string
    id: number
}

function Dialog(props: DialogType) {
    return (
        <div className={style.dialog_block}>
            <div className={style.username}>
                <span><NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink></span>
            </div>
        </div>
    )
}

export default Dialog;