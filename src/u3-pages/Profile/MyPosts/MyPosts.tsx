import React from 'react'
import {Post} from './Post/Post'
import {PostType} from '../../../u4-redux/profile-reducer'
import {MapDispatchType, MapStateType} from './MyPostsContainer'
import {AddNewPostForm, PostFormValuesType} from './AddNewPost/AddNewPost'

import s from './MyPosts.module.scss'

type OwnProps = {}

type OwnPropsType = MapStateType & MapDispatchType & OwnProps

export const MyPosts: React.FC<OwnPropsType> = ({profilePage, addPost}) => {

   let postElements = profilePage.posts
       .map((p: PostType) => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)

   const addPostCallback = (formData: PostFormValuesType) => {
      addPost(formData.postNewMessageText)
   }

   return (
       <div className={s.wall}>
          <aside className={s.sideBar}>
             <div className={s.central}>
                <span className={s.personal}>
                   Add Post
                </span>
                <AddNewPostForm onSubmit={addPostCallback}/>
             </div>
          </aside>
          <div className={s.posts}>
             {postElements}
          </div>
       </div>
   )
}
