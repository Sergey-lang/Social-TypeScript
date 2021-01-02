import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import classNames from 'classnames'

import s from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultButtonPropsType & {
   white?: boolean
}

export const Button: React.FC<ButtonPropsType> = ({className, children, onClick, white, ...restProps}) => {

   return (
       <button {...restProps}
               className={classNames(s.button, className, {
                  [s.white]: white,
               })}
               onClick={onClick}>{children}
       </button>
   )
}
