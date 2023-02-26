import React from "react";
import Icon from "./Icon";

import * as S from '../styled/AuthPopup.styled'

const AuthPopup = ({ message }) => {
    return (
        <S.Section>
            <S.Header>
                <p>{ message.message }</p>
                <p>{ message.messageDescripction }</p>
            </S.Header>
            <Icon iconName={message.icon} iconColor={message.iconColor} />
        </S.Section>
    )
};

export default AuthPopup;