import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 3.5rem;
    margin-top:${({ theme }) => theme.margin[0]};
    padding-left:${({theme})=>theme.padding[4]};
    border: none;
    border-radius:15px;
        &:placeholder{
            color:${({theme})=>theme.colors.placeholder};
        }
        &:focus{
            outline:3px solid ${({theme})=>theme.colors.inputFocusOutline};
            border:1px solid ${({ theme }) => theme.colors.inputFocus};
            color:${({theme})=>theme.colors.darkPurple};
        }
`

const Label = styled.label`
        font-size:${({ theme }) => theme.fontSizes[0]};
        color:${({theme})=>theme.colors.darkPurple}
`

export { Input, Label };