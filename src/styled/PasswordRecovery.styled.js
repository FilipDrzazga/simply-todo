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
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
`

const ButtonContainer = styled.div`
    width:100%;
    margin-top:${({theme})=>theme.margin[1]};
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-end;
`

export { Section, Form, ButtonContainer };