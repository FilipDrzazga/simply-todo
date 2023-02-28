import React from "react";
import { useNavigate } from "react-router-dom";

import * as S from '../styled/Input.styled'

const Input = ({ id, type, value, error, touched, onChange, onBlur, placeholder, htmlFor, labelText, forgotPassword }) => {

    const navigate = useNavigate();

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
            <S.MessagesContainer>
                <S.ErrorMessage>{touched && error}</S.ErrorMessage>
                {forgotPassword && <S.ForgotPassword onClick={()=>navigate('/password-recovery')}>Forgot password?</S.ForgotPassword>}
            </S.MessagesContainer>
        </>
    )
}

export default Input;