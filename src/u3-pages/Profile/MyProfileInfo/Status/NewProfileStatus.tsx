import React, {ChangeEvent, useEffect, useState} from 'react'
import {Button} from '../../../../u2-components/Button/Button'

import s from './ProfileStatus.module.scss'

type ProfileStatusWithHooksProps = {
   status: string
   updateOwnProfileStatus: (status: string) => void
   isOwner: boolean
}

export const ProfileStatusWithHooks = (props: ProfileStatusWithHooksProps) => {

   let [editMode, setEditMode] = useState<boolean>(false)
   let [status, setStatus] = useState<string>(props.status)

   useEffect(() => {
      setStatus(props.status)
   }, [props.status])

   const activateEditMode = () => {
      setEditMode(true)
   }

   const deactivateEditMode = () => {
      setEditMode(false)
      props.updateOwnProfileStatus(status)
   }

   const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value)
   }

   return (
       <div className={s.statusWrapper}>
          {
             editMode
                 ? <div className={s.status}>
                    <input className={s.statusInput}
                           type="text" autoFocus={true}
                           onBlur={deactivateEditMode}
                           onChange={onStatusChange}
                           value={status}/>
                 </div>
                 : <div className={s.editStatus}>
                    <span className={s.status}
                          onDoubleClick={activateEditMode}>{props.status || 'unfortunately the status is empty'}</span>
                    {props.isOwner &&
                    <div className={s.btnWrapper}>
                       <Button onClick={() => setEditMode(true)}>Edit</Button>
                    </div>
                    }
                 </div>
          }
       </div>
   )
}