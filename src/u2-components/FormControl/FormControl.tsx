import React, {FC} from 'react'
import s from './FormControl.module.scss'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {FieldValidatorType} from '../../utils/validator'

type FormControlPropsType = {
   meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

   const hasError = touched && error

   const styles = `${s.formControl}  ${hasError ? s.error : ''}`

   return (
       <div className={styles}>
          <div className={s.childrenWrapperStyle}>
             {children}
          </div>
          <div className={s.fieldErrorWrapper}>
             {
                hasError && <span>{error}</span>
             }
          </div>
       </div>
   )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
   const {input, meta, ...restProps} = props
   return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
   const {input, meta, ...restProps} = props
   return <FormControl {...props}>
      <input {...input}{...restProps}/>
   </FormControl>
}

export const Checkbox: React.FC<WrappedFieldProps> = (props) => {
   const {input, meta, ...restProps} = props
   return <FormControl {...props}>
      <input {...input}{...restProps}/>
   </FormControl>
}

//create wrapper
export const createField = <FormKeysType extends string>(placeholder: string | null,
                                                         name: FormKeysType,
                                                         component: React.FC<WrappedFieldProps>,
                                                         validators: Array<FieldValidatorType>,
                                                         props = {},
                                                         text = '') => (
    <div>
       <Field placeholder={placeholder}
              name={name}
              component={component}
              validate={validators}

              {...props}/>
       {text}
    </div>
)
