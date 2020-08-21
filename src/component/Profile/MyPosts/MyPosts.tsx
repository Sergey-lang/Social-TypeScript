import React from 'react';
import style from './MyPosts.module.css';

function MyPosts() {
  return (
    <div className={style.post_wrapper}>
      <div className={style.my_posts}>my_posts</div>
      <div className={style.add_new_posts}>add_new_posts</div>
    </div>
  )
}

export default MyPosts;