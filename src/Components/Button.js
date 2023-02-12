import React from "react";
import * as S from "../styled/Button.styled";

const Button = ({children, size, color}) => {
    return (
        <S.Button size={size} color={color}>{children}</S.Button>
    )
};

export default Button;