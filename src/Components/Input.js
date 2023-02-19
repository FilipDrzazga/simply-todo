import React from "react";

import * as S from '../styled/Input.styled'

const Input = ({id, type, placeholder, htmlFor, labelText}) => {
    return (
        <S.Label htmlFor={htmlFor}>{labelText}<S.Input id={id} type={type} placeholder={placeholder}></S.Input></S.Label>
    )
}

export default Input;