import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Input} from '../../../../common/Input/Input';
import s from './ProfileStatus.module.css'
import {EditableSpan} from '../../../../common/EditableSpan/EditableSpan';

export class ProfileStatus extends React.Component {

   state = {
      status: 'this is status',
      editMode: false
   }

   activateEditMode = () => {
      this.setState({editMode: true})
   }

   deactivateEditMode = () => {
      this.setState({editMode: false})
      // profileAPI.updateStatus(this.state.status)
   }

   onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({status: e.currentTarget.value})
   }

   onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         this.deactivateEditMode()
      }
   }

   render() {
      return <div>
         {!this.state.editMode &&
         <div>
            <span onClick={this.activateEditMode}>
               {this.state.status}
            </span>
         </div>}
         {this.state.editMode &&
         <div className={s.statusWrapper}>
            <Input type="text"
                   autoFocus={true}
                   onBlur={this.deactivateEditMode}
                   onChange={this.onStatusChange}
                   onKeyPress={this.onKeyPress}
                   className={s.input}
            />
         </div>
         }
      </div>
   }
}
