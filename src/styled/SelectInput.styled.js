import styled from "styled-components";
import Select from 'react-select';

const SelectContainer = styled.div`
    position: relative;
    width: 48%;
    height: 3.5rem;
`

const CustomSelect = styled(Select)`
    width:100%;
    height:100%;
    background-color:${({ theme }) => theme.colors.white};
    border-radius:15px;
    font-size:${({ theme }) => theme.fontSizes[0]};
    letter-spacing: 0.5px;
    .custom-select__control {
        width:100%;
        height:100%;
        font-size: ${({theme})=>theme.fontSizes[0]};
        border-radius:15px;
        border:none;
        box-shadow:none;
    }
    .custom-select__menu{
        box-shadow:none;
        border:none;
        border-radius:15px;
    }
    .custom-select__menu-list{
        color:${({theme})=>theme.colors.darkPurple};
        border:none;
    }
    .custom-select__indicator-separator{
        display:none;
    }
    .custom-select__indicator{
        color:${({theme})=>theme.colors.darkPurple};
    }
`

export { SelectContainer, CustomSelect };