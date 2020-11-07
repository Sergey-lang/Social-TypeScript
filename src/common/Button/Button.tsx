import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultButtonPropsType & {}

export const Button: React.FC<ButtonPropsType> = ({className, ...restProps}) => {
    const finalClassName = `${s.default} ${className}`;
    return (
        <>
            <button className={finalClassName} {...restProps}/>
        </>
    );
}

