import React from 'react';
import style from './MyPosts.module.css';
import Post from '../Post/Post';

import {ActionsTypes, PostType} from '../../../Redux/State';
import {AddPost} from './AddPost/AddPost';

type MyPostsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let postElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)
    return (
        <div className={style.post_wrapper}>
            <h4 className={style.my_posts_headline}>My posts</h4>
            <AddPost
                newPostText={props.newPostText}
                dispatch={props.dispatch}
            />
            {postElements}
        </div>
    )
}

export default MyPosts;