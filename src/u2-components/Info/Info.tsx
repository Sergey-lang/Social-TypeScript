import React, {PropsWithChildren} from 'react'

import s from './Info.module.scss'

type InfoProps = {
   description: string | null | boolean
   name: string
}

export const Info: React.FC<InfoProps> = ({name, description,children}) => {

   return <div className={s.info}>
                   <span className={s.title}>
                      {name}
                   </span>
      <p>{description}</p>
   </div>
}