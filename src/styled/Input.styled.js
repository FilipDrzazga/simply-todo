import styled from "styled-components";

const Input = styled.input`
    width: 100%;
        height: 3.5rem;
        margin-top:${({ theme }) => theme.margin[0]};
        padding-left:${({theme})=>theme.padding[4]};
        border: 1px solid transparent;
        border-radius:15px;
        &::placeholder{
            color:${({theme})=>theme.colors.placeholder};
        }
`

const Label = styled.label`
        font-size:${({ theme }) => theme.fontSizes[0]};
        color:${({theme})=>theme.colors.darkPurple}
`

export { Input, Label };