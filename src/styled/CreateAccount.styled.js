import styled from "styled-components";

const Section = styled.section`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:100%;
    height:100vh;
    min-height:100vh;
    background-color:${({theme})=>theme.colors.background.primary};
`

const Form = styled.form`
    width:100%;
    height:85%;
    display:flex;
    flex-direction:column;
    justify-content:center;
`

const ButtonContainer = styled.div`
    width:100%;
    flex-grow:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-end;
    div{
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        margin-top:${({theme})=>theme.margin[1]};
        margin-bottom:${({theme})=>theme.margin[1]};
        color:${({theme})=>theme.colors.font.primary};
        hr{
            width:30%;
            margin-right: 0.5rem;
            margin-left: 0.5rem;
            border: none;
            border-top: 1px solid;
        }
        span{
            font-size:${({ theme }) => theme.fontSizes[0]};
            font-weight:lighter;
        }
    }
`

export { Section, Form, ButtonContainer };