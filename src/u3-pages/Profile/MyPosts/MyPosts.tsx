import React from 'react'
import {Post} from './Post/Post'
import {MapDispatchType, MapStateType} from './MyPostsContainer'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../../../utils/validator'
import {Textarea} from '../../../u2-components/FormControl/FormControl'
import {Button} from '../../../u2-components/Button/Button'
import {PostType} from '../../../u4-redux/profile-reducer'

import s from './MyPosts.module.scss'
import {PersonalInfo} from '../../../u2-components/PersonalInfo/PersonalInfo'
import {AddNewPostForm, PostFormValuesType} from './AddNewPost/AddNewPost'

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
          <PersonalInfo title='Create Post'>
             <AddNewPostForm onSubmit={addPostCallback}/>
          </PersonalInfo>
          <div className={s.posts}>
             {postElements}
          </div>
       </div>
   )
}
