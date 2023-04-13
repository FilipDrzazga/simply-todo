import React from 'react'
import * as S from '../styled/Select.styled';
import Icon from './Icon';

const Select = () => {
    return (
      <>
        <S.SelectContainer>
            <S.SelectButton>
                <div></div>
                <span></span>
                <Icon iconName={'angle-down'} iconColor='darkPurple'/>
            </S.SelectButton>
        </S.SelectContainer>
      </>
  )
}

export default Select;