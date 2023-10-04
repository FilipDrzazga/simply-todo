import React from "react";
import { useNavigate } from "react-router";
import * as S from "../styled/Button.styled";

const Button = ({
  initial,
  animate,
  whileHover,
  variants,
  children,
  type,
  size,
  primary,
  secondary,
  removebtn,
  disabled,
  navigateTo,
  removeOnClick,
}) => {
  const navigate = useNavigate();

  const handleNavigateOnClick = () => {
    navigate(navigateTo);
  };

  const handleClick = () => {
    removeOnClick && removeOnClick();
  };

  return (
    <S.Button
      variants={variants}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
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
