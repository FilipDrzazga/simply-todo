import React from "react";
import { useNavigate } from "react-router";
import * as S from "../styled/Button.styled";

const Button = ({ children, type, size, primary, secondary, circle, position, disabled, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <S.Button
      primary={primary}
      secondary={secondary}
      type={type}
      size={size}
      position={position}
      disabled={disabled}
      circle={circle}
      onClick={() => navigate(navigateTo)}
    >
      {children}
    </S.Button>
  );
};

export default Button;
