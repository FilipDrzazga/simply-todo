import React from "react";
import { useNavigate } from "react-router";
import * as S from "../styled/Button.styled";

const Button = ({ children, size, color, disabled, navigateTo }) => {

    const navigate = useNavigate();

    return (
        <S.Button onClick={()=> navigate(navigateTo)} disabled={disabled} size={size} color={color}>{children}</S.Button>
    )
};

export default Button;