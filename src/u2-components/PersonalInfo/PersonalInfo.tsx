import React from 'react'

import s from './PersonalInfo.module.scss'

type PersonalInfoProps = {
   title: string
   children: any
}

export const PersonalInfo:React.FC<PersonalInfoProps> = ({title, children, ...restProps}) => {

   return (
       <aside className={s.sidebar} {...restProps}>
          <div className={s.central}>
                <span className={s.personal}>
                   {title}
                </span>
             {children}
          </div>
       </aside>
   )
}