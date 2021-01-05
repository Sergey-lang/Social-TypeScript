import React, {Component, ReactNodeArray, ReactPortal} from 'react'

import s from './Info.module.scss'

type InfoProps = {
   description?: string | null | boolean
   name: string
   children?: any
   className?: any
}

export const Info: React.FC<InfoProps> = ({name, description, children, className}) => {

   const finalClass = `${s.info} ${className}`

   return <div className={finalClass}>
                   <span className={s.title}>
                      {name}
                   </span>
      <span className={s.description}>{children ? children : description ? description : 'Information is not provided'}</span>
   </div>
}