import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from '../Post/Post';
import {ProfilePageType} from '../../../essences/essences';

type MyPostsType = {
    profilePage: ProfilePageType
    addPostCallback: () => void
    changingPostTextCallback: (postText: string) => void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {
    let postElements = props.profilePage.posts.map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)

    const addPost = () => {
        props.addPostCallback()
    }
    const changingPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let postText = e.currentTarget.value
        props.changingPostTextCallback(postText)
    }

    return (
        <div className={style.post_wrapper}>
            <h4 className={style.my_posts_headline}>My posts</h4>
            <div className={style.add_new_posts}>
                <div className={style.area_wrapper}>
                <textarea value={props.profilePage.newPostText}
                          onChange={changingPostText}
                          placeholder='What is new?'
                          className={style.area}></textarea>
                </div>
                <div className={style.button_wrapper}>
                    <button className={style.add_post_button} onClick={addPost}>Add post</button>
                </div>
            </div>
            {postElements}
        </div>
    )
}

export default MyPosts;