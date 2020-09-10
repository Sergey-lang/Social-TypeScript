import React, {ChangeEvent} from 'react';
import style from './AddPost.module.css';

type AddPostType = {
    newPostText: string
    addNewPost: () => void
    updateNewPostText: (changedPostText: string) => void
}

export function AddPost(props: AddPostType) {

    const addPost = () => {
        props.addNewPost()
    }
    const changingPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={style.add_new_posts}>
            <div className={style.area_wrapper}>
                <textarea value={props.newPostText}
                          onChange={changingPostText}
                          placeholder='What is new?'
                          className={style.area}></textarea>
            </div>
            <div className={style.button_wrapper}>
                <button className={style.add_post_button} onClick={addPost}>Add post</button>
            </div>
        </div>
    )
}
