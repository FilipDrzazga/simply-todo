import React from "react";
import { useNavigate } from "react-router-dom";

import * as S from '../styled/Input.styled'

const Input = ({ id, type, value, error, touched, onChange, onBlur, placeholder, htmlFor, labelText, size, forgotPassword }) => {

    const navigate = useNavigate();

    return (
        <S.InputContainer>
            <S.Label error={error} touched={touched} size={size} htmlFor={htmlFor}>{labelText}</S.Label>
            <S.Input
                id={id}
                type={type}
                value={value}
                error={error}
                touched={touched}
                onChange={onChange}
                onBlur={onBlur}
                size={size}
                placeholder={placeholder}>
            </S.Input>
            <S.MessagesContainer>
                <S.ErrorMessage>{touched && error}</S.ErrorMessage>
                {forgotPassword && <S.ForgotPassword onClick={() => navigate('/password-recovery')}>Forgot password?</S.ForgotPassword>}
            </S.MessagesContainer>
        </S.InputContainer>
    )
};

export default Input;