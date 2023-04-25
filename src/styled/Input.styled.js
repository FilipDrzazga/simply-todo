import styled, { css } from "styled-components";

const InputContainer = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:${({theme})=>theme.margin[0]};
`

const Input = styled.input`
    width: ${({size})=>size};
    height: 3.5rem;
    background-color: ${({ theme }) => theme.colors.input.background};
    color: ${({ theme }) => theme.colors.input.font};
    border-radius:15px;
    border:2px solid ${({ theme }) => theme.colors.input.border};
    padding-left:${({ theme }) => theme.padding[4]};
    ${({ theme, error, touched }) => error && touched && css`border:2px solid ${theme.colors.input.invalid};`};
    ${({ theme, error, touched }) => !error && touched && css`border:2px solid ${theme.colors.input.valid};`};
    &::placeholder{
        color:${({ theme }) => theme.colors.input.placeholder};
    }
    &:focus{
        outline:none;
        border:2px solid ${({ theme }) => theme.colors.input.focus};
    }
`

const Label = styled.label`
    width: ${({ size }) => size};
    font-size:${({ theme }) => theme.fontSizes[0]};
    color: ${({theme})=> theme.colors.input.label};
    ${({ theme, error, touched }) => error && touched && css`color:${theme.colors.input.invalid};`};
    ${({ theme, error, touched }) => !error && touched && css`color:${theme.colors.input.valid};`};
`

const MessagesContainer = styled.div`
    width: ${({ size }) => size};
    display:flex;
    justify-content:space-between;
    margin-bottom:${({theme})=>theme.margin[2]};
`

const ErrorMessage = styled.span`
    width:60%;
    height:10px;
    font-size:${({ theme }) => theme.fontSizes[0]};
    color:${({ theme }) => theme.colors.input.invalid};
`

const ForgotPassword = styled.span`
    height:10px;
    font-size:${({ theme }) => theme.fontSizes[0]};
    font-weight:lighter;
    color:${({ theme }) => theme.colors.input.label};
    text-decoration-line:underline;
`

export { InputContainer, Input, Label, MessagesContainer, ErrorMessage, ForgotPassword };