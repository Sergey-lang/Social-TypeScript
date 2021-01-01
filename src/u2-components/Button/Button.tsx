import React from 'react'
import classNames from 'classnames'

import s from './Button.module.scss'

type ButtonProps = {
   className?: string
   white?: boolean
   children: any
   onClick?: () =>void
   disabled?:boolean
}

export const Button:React.FC<ButtonProps> = ({className, white, children, onClick,...restProps}) => {

   return (
       <a {...restProps}
          onClick={onClick}
          className={classNames(s.button, className, {
          '--white': white,
       })}
          {...restProps}
       >{children}</a>
   )
}
