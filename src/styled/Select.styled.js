import styled from "styled-components";

const SelectContainer = styled.div`
    position: relative;
    width: 40%;
    height: 3.5rem;
`

    const SelectButton = styled.button`
    width:100%;
    height:100%;
    border:none;
    border-radius:15px;
    background-color:${({ color, theme }) => color === 'dark'? theme.colors.purple : theme.colors.lightPurple};
`

export { SelectContainer, SelectButton };

// , SelectButton, DropdownStyle, DropdownItem