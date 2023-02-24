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
            <S.IconContainer iconColor={message.iconColor}>
                <Icon iconName={message.icon} />
            </S.IconContainer>
        </S.Section>
    )
};

export default AuthPopup;