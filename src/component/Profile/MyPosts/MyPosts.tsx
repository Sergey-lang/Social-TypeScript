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
            <Post message={'Hello I am props and I went to this component right now'} likeCount={21}/>
            <Post message={'I am very handsome props'} likeCount={10}/>
            <Post message={'I go out from mypost component'} likeCount={5}/>
        </div>
    )
}

export default MyPosts;