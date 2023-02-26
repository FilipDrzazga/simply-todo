import React from "react";
import * as S from '../styled/Icon.style';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(far);

const Icon = ({ iconName, iconColor }) => {
    return (
        <S.Container iconColor={iconColor}>
            <FontAwesomeIcon icon={['far', iconName]} />
        </S.Container>
    )
};

export default Icon;