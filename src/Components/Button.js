import React from "react";
import { useNavigate } from "react-router";
import * as S from "../styled/Button.styled";

const Button = ({ children, type, size, color, disabled, navigateTo, whileHover }) => {

    const navigate = useNavigate();

    return (
        <S.Button
            type={type}
            size={size}
            color={color}
            disabled={disabled}
            onClick={() => navigate(navigateTo)}>{children}
        </S.Button>
    )
};

export default Button;