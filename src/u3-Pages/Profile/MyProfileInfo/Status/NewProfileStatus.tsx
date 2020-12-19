import React, {ChangeEvent, useEffect, useState} from 'react'

type PropsType = {
   status: string
   updateOwnProfileStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: PropsType) => {

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
       <div>
          {!editMode &&
          <div>
               <span onDoubleClick={activateEditMode}>
                  {props.status || '-----'}
               </span>
          </div>}
          {editMode &&
          <div>
             <input autoFocus={true}
                    onBlur={deactivateEditMode}
                    onChange={onStatusChange}
                    value={status}
             />
          </div>}
       </div>
   )
}