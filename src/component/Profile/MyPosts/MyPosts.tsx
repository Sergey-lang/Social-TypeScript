import React from 'react';
import style from './MyPosts.module.css';
import Post from '../Post/Post';

function MyPosts() {
    return (
        <div className={style.post_wrapper}>
            <h4 className={style.my_posts_headline}>My posts</h4>
            <div className={style.add_new_posts}>
                <div>
                    <textarea placeholder='What is new?' className={style.area}></textarea>
                </div>
                <div>
                    <button className={style.add_post_button}>Add post</button>
                </div>
            </div>
            <Post/>
            <Post/>
            <Post/>
        </div>
    )
}

export default MyPosts;