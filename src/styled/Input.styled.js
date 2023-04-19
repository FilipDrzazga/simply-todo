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
    outline:3px solid ${({theme})=>theme.colors.darkRed};
    border:1px solid ${({ theme }) => theme.colors.red};
    `};
    ${({ error, touched }) => !error && touched && css`
    outline:3px solid ${({theme})=>theme.colors.darkGreen};
    border:1px solid ${({ theme }) => theme.colors.green};
    `};
    &:placeholder{
        color:${({theme})=>theme.colors.placeholder};
    }
    &:focus{
        outline:3px solid ${({theme})=>theme.colors.darkBlue};
        border:1px solid ${({ theme }) => theme.colors.blue};
    }
`

const Label = styled.label`
    width: 100%;
    font-size:${({ theme }) => theme.fontSizes[0]};
    color:${({ error, touched, theme })=> error && touched ? theme.colors.red : theme.colors.darkPurple};
`

const MessagesContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-bottom:${({theme})=>theme.margin[1]};
`

const ErrorMessage = styled.span`
    width:45%;
    height:10px;
    margin-top:-3%;
    font-size:${({ theme }) => theme.fontSizes[0]};
    color:${({ theme }) => theme.colors.red};
`

const ForgotPassword = styled.span`
    height:10px;
    margin-top:-3%;
    font-size:${({ theme }) => theme.fontSizes[0]};
    color:${({ theme }) => theme.colors.darkPurple};
    text-decoration-line:underline;
    text-align:right;

`

export { Input, Label, MessagesContainer, ErrorMessage, ForgotPassword };