import React from 'react'
import Post from '../Post/Post'
import {MapDispatchType, MapStateType} from './MyPostsContainer'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../../../utils/validator'
import {Textarea} from '../../../u2-components/FormControl/FormControl'
import {Button} from '../../../u2-components/Button/Button'
import {PostType} from '../../../u4-redux/profile-reducer'

import s from './MyPosts.module.css'

type OwnProps = {}

type OwnPropsType = MapStateType & MapDispatchType & OwnProps

export const MyPosts: React.FC<OwnPropsType> = ({profilePage, addPost}) => {

   let postElements = profilePage.posts
       .map((p: PostType) => <Post message={p.message} likeCount={p.likeCount} key={p.id}/>)

   const addPostCallback = (formData: PostFormValuesType) => {
      addPost(formData.postNewMessageText)
   }

   return (
       <div className={s.post_wrapper}>
          <h4 className={s.my_posts_headline}>My posts</h4>
          <AddNewPostForm onSubmit={addPostCallback}/>
          {postElements}
       </div>
   )
}

const maxLength10 = maxLengthCreator(10)

export const AddPost: React.FC<InjectedFormProps<PostFormValuesType, PostFormOwnProps> & PostFormOwnProps> =
    ({handleSubmit, error}) => {
       return (
           <form onSubmit={handleSubmit}>
              <div>
                 <div>
                    <Field placeholder='Add post'
                           component={Textarea}
                           name='postNewMessageText'
                           className={s.area}
                           validate={[required, maxLength10]}
                    />
                 </div>
                 <div className={s.button_wrapper}>
                    <Button className={s.btn}>Add post</Button>
                 </div>
              </div>
           </form>
       )
    }

export type PostFormValuesType = {
   postNewMessageText: string
}

export type PostFormOwnProps = {}

const AddNewPostForm = reduxForm<PostFormValuesType, PostFormOwnProps>({form: 'postAddMessageForm'})(AddPost)