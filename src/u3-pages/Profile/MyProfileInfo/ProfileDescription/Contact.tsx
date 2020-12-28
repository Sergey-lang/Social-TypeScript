import s from './ProfileDescription.module.css'
import React from 'react'

type ContactProps = {
   contactTitle: string
   contactValue: string
}

export const Contact: React.FC<ContactProps> = ({contactTitle, contactValue}) => {
   return (
       <div className={s.description}>
          <div className={s.title}>
             {contactTitle}:
          </div>
          <div className={s.inform}>
             {contactValue}
          </div>
       </div>
   )
}