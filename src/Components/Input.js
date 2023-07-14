import React from "react";
import { useNavigate } from "react-router-dom";

import * as S from "../styled/Input.styled";

const Input = ({
  autoFocus,
  id,
  type,
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  placeholderColor,
  htmlFor,
  labelText,
  labelVisibility,
  size,
  forgotPassword,
  borderStyleLine,
}) => {
  const navigate = useNavigate();

  return (
    <S.InputContainer>
      <S.Label error={error} touched={touched} size={size} htmlFor={htmlFor} labelVisibility={labelVisibility}>
        {labelText}
      </S.Label>
      <S.Input
        autoFocus={autoFocus}
        id={id}
        type={type}
        value={value}
        error={error}
        touched={touched}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
        placeholder={placeholder}
        placeholderColor={placeholderColor}
        borderStyleLine={borderStyleLine}
      ></S.Input>
      <S.MessagesContainer size={size}>
        <S.ErrorMessage>{touched && error}</S.ErrorMessage>
        {forgotPassword && (
          <S.ForgotPassword onClick={() => navigate("/password-recovery")}>Forgot password?</S.ForgotPassword>
        )}
      </S.MessagesContainer>
    </S.InputContainer>
  );
};

export default Input;
