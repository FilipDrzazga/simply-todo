import React from 'react'
import * as S from '../styled/SelectInput.styled';

const dumyData = [
  {
    value: 'Important',
    label: 'Important',
    color:'red'
  },
  {
    value: 'Job',
    label: 'Job',
    color: 'green'
  }, {
    value: 'Shop',
    label: 'Shop',
    color: 'pink'
  }, {
    value: 'Teodor',
    label: 'Teodor',
    color: 'purple'
  }
];

const dot = (color = 'transparent') => ({
  display: 'flex',
  alignItems: 'center',
  ':before': {
    display: 'block',
    content: '" "',
    height: 10,
    width: 10,
    marginRight: 10,
    backgroundColor: color,
    borderRadius: 10,
  }
});

const customStyles = {
  input: (styles) => ({
    ...styles,
    ...dot()
  }),
  placeholder: (styles) => ({
    ...styles,
    ...dot('#ccc')
  }),
  option: (styles, { data, isFocused, isSelected }) => ({
    ...styles,
    ...dot(data.color),
    backgroundColor: isFocused && '#E3DDFF',
    color: isSelected && '#080227'
  }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

const SelectInput = () => {
  return (
    <S.SelectContainer>
      <S.CustomSelect styles={customStyles} options={dumyData} classNamePrefix='custom-select' />
    </S.SelectContainer>
  )
}

export default SelectInput;