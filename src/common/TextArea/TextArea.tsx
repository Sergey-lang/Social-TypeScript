import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    TextareaHTMLAttributes,
    KeyboardEvent,
    ChangeEvent
} from 'react';

import s from './TextArea.module.css'

type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type TextAreaPropsType = DefaultTextAreaPropsType & {
    onEnter?: () => void
    onChangeText?: (value: string) => void
}

export const TextArea: React.FC<TextAreaPropsType> = ({className, onChange, onKeyPress, onEnter, onChangeText, ...restProps}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === 'Enter' // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }
    const finalClassName = `${s.default} ${className}`;
    return (
        <>
            <textarea className={finalClassName}
                      onChange={onChangeCallback}
                      onKeyPress={onKeyPressCallback}
                      {...restProps}></textarea>
        </>
    );
}


