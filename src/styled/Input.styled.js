import styled, { css } from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 3.5rem;
    margin-top:${({ theme }) => theme.margin[0]};
    padding-left:${({theme})=>theme.padding[4]};
    border: none;
    border-radius:15px;
    color:${({theme})=>theme.colors.darkPurple};
    ${({ error, touched }) => error && touched && css`
    outline:3px solid ${({theme})=>theme.colors.inputErrorOutline};
    border:1px solid ${({ theme }) => theme.colors.inputError};
    `};
    ${({ error, touched }) => !error && touched && css`
    outline:3px solid ${({theme})=>theme.colors.inputCorrectOutline};
    border:1px solid ${({ theme }) => theme.colors.inputCorrect};
    `};
    &:placeholder{
        color:${({theme})=>theme.colors.placeholder};
    }
    &:focus{
        outline:3px solid ${({theme})=>theme.colors.inputFocusOutline};
        border:1px solid ${({ theme }) => theme.colors.inputFocus};
    }
`

const Label = styled.label`
    font-size:${({ theme }) => theme.fontSizes[0]};
    color:${({ error, touched, theme })=> error && touched ? theme.colors.inputError : theme.colors.darkPurple};
`

const ErrorMessage = styled.span`
    width:100%;
    height:10px;
    margin-top:-3%;
    font-size:${({ theme }) => theme.fontSizes[0]};
    color:${({ theme }) => theme.colors.inputError};
`

export { Input, Label, ErrorMessage };