import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {Button} from '../../../../u2-components/Button/Button'
import posterImg from './../../../../u1-assets/images/user.jpg'
import {createField, GetStringKeys, Textarea} from '../../../../u2-components/FormControl/FormControl'
import {required} from '../../../../utils/validator'

import s from './AddNewPost.module.scss'

type PostFormValuesTypeKeys = GetStringKeys<PostFormValuesType>

export const AddPost: React.FC<InjectedFormProps<PostFormValuesType, PostFormOwnProps> & PostFormOwnProps> =
    ({handleSubmit, error}) => {

       return (
           <form className={s.newPostBox} onSubmit={handleSubmit}>
              <div className={s.addMessageWrapper}>
                 <figure>
                    <img className={s.posterImg} src={posterImg} alt="post"/>
                 </figure>
                 <div className={s.input}>
                    {createField<PostFormValuesTypeKeys>('Share some what you are thinking?', 'postNewMessageText', Textarea, [required])}
                 </div>
              </div>
              <div>
                 <Button className={s.postBtn}>Post</Button>
              </div>
           </form>
       )
    }

export type PostFormValuesType = {
   postNewMessageText: string
}

export type PostFormOwnProps = {}

export const AddNewPostForm = reduxForm<PostFormValuesType, PostFormOwnProps>({form: 'postAddMessageForm'})(AddPost)