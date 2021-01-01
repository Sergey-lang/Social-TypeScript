import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Button} from '../../../../u2-components/Button/Button'
import posterImg from './../../../../u1-assets/images/user.jpg'
import {maxLengthCreator, required} from '../../../../utils/validator'
import {Textarea} from '../../../../u2-components/FormControl/FormControl'

import s from './AddNewPost.module.scss'

const maxLength10 = maxLengthCreator(10)

export const AddPost: React.FC<InjectedFormProps<PostFormValuesType, PostFormOwnProps> & PostFormOwnProps> =
    ({handleSubmit, error}) => {

       return (
           <form className={s.newPostBox} onSubmit={handleSubmit}>
              <div>
                 <figure>
                    <img src={posterImg} alt="post"/>
                 </figure>
                 <div className={s.input}>
                    <Field placeholder="Share some what you are thinking?"
                           component={Textarea}
                           name='postNewMessageText'
                           className={s.area}
                           validate={[required, maxLength10]}
                    />
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