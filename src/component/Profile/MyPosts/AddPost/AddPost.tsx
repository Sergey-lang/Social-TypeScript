import React from 'react';
import style from './AddPost.module.css';

function AddPost() {
    let newPost:React.RefObject<HTMLTextAreaElement> = React.createRef()
    let addPost = () => {
        let text = newPost.currentTarget.value
        alert(text)
    }
    return (
        <div className={style.add_new_posts}>
            <div>
                <textarea ref={newPost} placeholder='What is new?' className={style.area}></textarea>
            </div>
            <div>
                <button className={style.add_post_button} onClick={addPost}>Add post</button>
            </div>
        </div>
    )
}

export default AddPost;