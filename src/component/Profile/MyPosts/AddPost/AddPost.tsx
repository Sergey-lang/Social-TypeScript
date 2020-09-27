import React, {ChangeEvent} from 'react';
import style from './AddPost.module.css';
import {ActionsTypes} from '../../../../Redux/State';
import {AddPostAC, UpdateNewPostTextAC} from '../../../../Redux/profile-reducer';

export type AddPostPropsType = {
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

export const AddPost: React.FC<AddPostPropsType> = (props) => {

    const addPost = () => {
        props.dispatch(AddPostAC())
    }
    const changingPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(UpdateNewPostTextAC(e.currentTarget.value))
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