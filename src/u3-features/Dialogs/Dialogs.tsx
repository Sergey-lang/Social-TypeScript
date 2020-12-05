import React from 'react';
import s from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {mapDispatchType, MapStateType} from './DialogsContainer';
import {maxLengthCreator, required} from '../../utils/validator';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../u2-components/FormControl/FormControl';
import {Button} from '../../u2-components/Button/Button';

type OwnProps = {}

type OwnPropsType = MapStateType & mapDispatchType  & OwnProps

export const Dialogs: React.FC<OwnPropsType> = ({dialogsPage, addMessage, ...props}) => {

   let dialogsElement = dialogsPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id}/>)
   let messagesElement = dialogsPage.messages.map(m => <Message id={m.id} message={m.message} key={m.id}/>)

   const sendMessageCallback = (formData: DialogFormValuesType) => {
      addMessage(formData.dialogNewMessageText)
   }

   return (
      <div className={s.dialogs_container}>
         <div className={s.my_dialogs_headline}>Dialogs</div>
         <div className={s.message_page}>
            <div className={s.dialogs_wrapper}>
               {dialogsElement}
            </div>
            <div className={s.messages_wrapper}>
               <div className={s.message_block}>
                  {messagesElement}
               </div>
               <AddNewMessageForm onSubmit={sendMessageCallback}/>
            </div>
         </div>
      </div>
   )
}

const maxLength50 = maxLengthCreator(50)

export const AddMessage: React.FC<InjectedFormProps<DialogFormValuesType, DialogFormOwnProps> & DialogFormOwnProps> = ({handleSubmit, error}) => {

   return (
      <form onSubmit={handleSubmit}>
         <div className={s.add_new_message}>
            <div className={s.area_wrapper}>
               <Field placeholder='Send message'
                      component={Textarea}
                      className={s.area}
                      name="dialogNewMessageText"
                      validate={[required, maxLength50]}
               />
            </div>
            <div className={s.button_wrapper}>
               <Button className={s.btn}>Send message</Button>
            </div>
         </div>
      </form>
   )
}

export type DialogFormValuesType = {
   dialogNewMessageText: string
}

export type DialogFormOwnProps = {

}

const AddNewMessageForm = reduxForm<DialogFormValuesType, DialogFormOwnProps>({form: 'dialogAddMessageForm'})(AddMessage)
