import React, {ChangeEvent, KeyboardEvent, DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import s from './EditableSpan.module.css'
import {Input} from '../Input/Input';

type DefaultInputPropsType = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

type EditableSpanPropsType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string

   spanProps?: DefaultSpanPropsType
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
   {
      autoFocus,
      onBlur,
      onEnter,
      spanProps,
      spanClassName,
      ...restProps
   }) => {

   const [editMode, setEditMode] = useState<boolean>(false);
   const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {};

   const onEnterCallback = () => {
      setEditMode(false); // выключить editMode при нажатии Enter

      onEnter && onEnter();
   };

   const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
      setEditMode(false); // выключить editMode при нажатии за пределами инпута

      onBlur && onBlur(e);
   };

   const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setEditMode(true); // включить editMode при двойном клике

      onDoubleClick && onDoubleClick(e);
   };

   const finalInputClassName = `${s.inputDefault} ${className}`;
   const finalSpanClassName = `${s.spanDefault} ${spanClassName}`;

   return (
      <>
         {editMode ? (
            <Input
               autoFocus // пропсу с булевым значением не обязательно указывать true
               onBlur={onBlurCallback}
               onEnter={onEnterCallback}
               className={finalInputClassName}
               {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
         ) : (
            <span
               onDoubleClick={onDoubleClickCallBack}
               className={finalSpanClassName}

               {...restSpanProps}
            >
            {/*если нет захардкодженного текста для спана, то значение инпута*/}
               {children || restProps.value}
            </span>
         )

         }
      </>
   );
}
