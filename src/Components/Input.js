import React from "react";

import * as S from '../styled/Input.styled'

const Input = ({id, type, value, error, touched, onChange, onBlur, placeholder, htmlFor, labelText}) => {
    return (
        <>
            <S.Label htmlFor={htmlFor}>{labelText}
                <S.Input
                    id={id}
                    type={type}
                    value={value}
                    error={error}
                    touched={touched}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}>
                </S.Input>
            </S.Label>
            <S.ErrorMessage>{ touched && error }</S.ErrorMessage>
        </>
    )
}

export default Input;