import React from 'react';
import style from './Dialog.module.css';

function Dialog() {
    return (
        <div className={style.dialog_block}>
            <div className={style.username}>
                <span>Sergey Ivanov</span>
            </div>
        </div>
    )
}

export default Dialog;