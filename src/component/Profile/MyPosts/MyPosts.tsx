import React from 'react';
import style from './MyPosts.module.css';
import Post from '../Post/Post';

import {PostType} from '../../../Redux/State';
import {AddPost} from './AddPost/AddPost';

type MyPostsType = {
    posts: Array<PostType>
    newPostText: string
    addNewPost: () => void
    updateNewPostText: (changedPostText: string) => void
}

function MyPosts(props: MyPostsType) {
    let postElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)
    return (
        <div className={style.post_wrapper}>
            <h4 className={style.my_posts_headline}>My posts</h4>
            <AddPost newPostText={props.newPostText}
                     addNewPost={props.addNewPost}
                     updateNewPostText={props.updateNewPostText}
            />
            {postElements}
        </div>
    )
}

export default MyPosts;