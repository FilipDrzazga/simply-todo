import styled from "styled-components";

const SelectContainer = styled.div`
    position: relative;
    width: 48%;
    height: 3.5rem;
`

    const SelectButton = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width:100%;
    height:100%;
    border:none;
    border-radius:15px;
    font-size: ${({theme})=>theme.fontSizes[0]};
    background-color:${({ theme }) => theme.colors.white};
`

export { SelectContainer, SelectButton };

// , SelectButton, DropdownStyle, DropdownItem