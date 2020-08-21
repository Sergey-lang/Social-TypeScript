import React from 'react';
import style from './MyPosts.module.css';

function MyPosts() {
  return (
    <div className={style.post_wrapper}>
      <div className={style.any}></div>
      <div className={style.wall_posts}>

        <div className={style.add_new_posts}>
          <div className={style.text_wrapper}>
            <div className={style.small_user_photo}>img</div>
            <textarea></textarea>
          </div>
            <button className={style.add_post_button}>Published</button>
        </div>

        <div className={style.my_posts}>my_posts</div>
      </div>
    </div>
  )
}

export default MyPosts;