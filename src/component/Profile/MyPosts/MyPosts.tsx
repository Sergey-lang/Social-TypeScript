import style from './MyPosts.module.css';
import React, {ChangeEvent} from 'react';
import Post from '../Post/Post';
import {ProfilePageInitType} from '../../../Redux/profile-reducer';

type MyPostsType = {
  profilePage: ProfilePageInitType
  addPost: () => void
  changingPostText: (postText: string) => void
}

export const MyPosts: React.FC<MyPostsType> = ({profilePage, addPost, changingPostText}) => {
  let postElements = profilePage.posts
    .map(p => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)

  const addPostCallback = () => {
    addPost()
  }
  const changingPostTextCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let postText = e.currentTarget.value
    changingPostText(postText)
  }

  return (
    <div className={style.post_wrapper}>
      <h4 className={style.my_posts_headline}>My posts</h4>
      <div className={style.add_new_posts}>
        <div className={style.area_wrapper}>
                <textarea value={profilePage.newPostText}
                          onChange={changingPostTextCallback}
                          placeholder='What new?'
                          className={style.area}></textarea>
        </div>
        <div className={style.button_wrapper}>
          <button className={style.add_post_button} onClick={addPostCallback}>Add post</button>
        </div>
      </div>
      {postElements}
    </div>
  )
}