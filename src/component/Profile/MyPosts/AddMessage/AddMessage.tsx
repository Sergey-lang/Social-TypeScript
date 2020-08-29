import React from 'react';
import style from './AddMessage.module.css';

function AddMessage() {
    return (
        <div className={style.add_new_posts}>
            <div>
                <textarea placeholder='What is new?' className={style.area}></textarea>
            </div>
            <div>
                <button className={style.add_post_button}>Add post</button>
            </div>
        </div>
    )
}

export default AddMessage;