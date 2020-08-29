import React from 'react';
import style from './MyPosts.module.css';
import Post from '../Post/Post';
import AddMessage from './AddMessage/AddMessage';


type PostDatatype = {
    id: number
    message: string
    likeCount: number
}

function MyPosts() {
    const postData: Array<PostDatatype> = [
        {id: 1, message: 'Hello I am props and I went to this component right now', likeCount: 21},
        {id: 2, message: 'I am very handsome props', likeCount: 10},
        {id: 3, message: 'I go out from mypost component', likeCount: 5}
    ]
    let postElements = postData.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)
    return (
        <div className={style.post_wrapper}>
            <h4 className={style.my_posts_headline}>My posts</h4>
            <AddMessage/>
            {postElements}
        </div>
    )
}

export default MyPosts;