import React from 'react';
import style from './MyPosts.module.css';
import Post from '../Post/Post';

type PostDatatype = {
    id:number
    message:string
    likeCount:number
}

function MyPosts() {
    const postData:Array<PostDatatype> = [
        {id:1, message:'Hello I am props and I went to this component right now', likeCount:21},
        {id:2, message:'I am very handsome props', likeCount:10},
        {id:3, message:'I go out from mypost component', likeCount:5}
    ]
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
            <Post message={postData[0].message} likeCount={postData[0].likeCount}/>
            <Post message={postData[1].message} likeCount={postData[1].likeCount}/>
            <Post message={postData[2].message} likeCount={postData[2].likeCount}/>
        </div>
    )
}

export default MyPosts;