import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Input} from '../../../../common/Input/Input';
import s from './ProfileStatus.module.css'

type PropsType = {
   status: string
   updateProfileStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<PropsType> {

   state = {
      status: this.props.status,
      editMode: false
   }

   activateEditMode = () => {
      this.setState({editMode: true})
   }

   deactivateEditMode = () => {
      this.setState({editMode: false})
      this.props.updateProfileStatus(this.state.status)
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
               {this.props.status || 'status not found'}
            </span>
         </div>}
         {this.state.editMode &&
         <div className={s.statusWrapper}>
            <Input type="text"
                   autoFocus={true}
                   value={this.state.status}
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
