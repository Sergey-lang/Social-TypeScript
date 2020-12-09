import React, {ChangeEvent, KeyboardEvent, DetailedHTMLProps} from 'react'
import s from './Input.module.css'

type DefaultInputPropsType = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputPropsType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string
}

export const Input: React.FC<InputPropsType> = (
    {
       onChange,
       onKeyPress,
       className,
       onChangeText,
       onEnter, error,
       spanClassName,

       ...restProps
    }) => {

   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange // если есть пропс onChange
      && onChange(e) // то передать ему е (поскольку onChange не обязателен)

      onChangeText && onChangeText(e.currentTarget.value)
   }

   const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress(e)

      e.key === 'Enter'
      && onEnter
      && onEnter()
   }

   const finalInputClassName = `${s.inputDefault} ${className}`
   const finalSpanClassName = `${s.spanDefault} ${spanClassName}`
   return (
       <>
          <input type="text"
                 onChange={onChangeCallback}
                 onKeyPress={onKeyPressCallback}
                 className={finalInputClassName}
                 {...restProps}
          />
          {error && <span className={finalSpanClassName}>{error}</span>}
       </>
   )
}
