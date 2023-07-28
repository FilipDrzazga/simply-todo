import React from "react";
import { useNavigate } from "react-router";
import * as S from "../styled/Button.styled";

const Button = ({ children, type, size, primary, secondary, removebtn, disabled, navigateTo, removeOnClick }) => {
  const navigate = useNavigate();

  const handleNavigateOnClick = () => {
    navigate(navigateTo);
  };

  const handleClick = () => {
    removeOnClick && removeOnClick();
  };

  return (
    <S.Button
      primary={primary}
      secondary={secondary}
      removebtn={removebtn}
      type={type}
      size={size}
      disabled={disabled}
      onClick={() => {
        handleNavigateOnClick();
        handleClick();
      }}
    >
      {children}
    </S.Button>
  );
};

export default Button;
