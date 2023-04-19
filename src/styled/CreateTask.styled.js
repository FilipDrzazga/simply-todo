import styled from "styled-components";

const Section = styled.section`
    width:100vw;
    height:100vh;
    background-color: ${({ theme }) => theme.colors.lightGray };
`

const Form = styled.form`
    width:100%;
    height:60%;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    align-content: flex-end;
    padding:${({ theme }) => theme.padding[4]};
    label{
        align-self:flex-end;
        margin-bottom:${({theme})=> theme.margin[1]};
    }
`

const ButtonContainer = styled.div`
    width:100%;
    height:35%;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    padding:${({ theme }) => theme.padding[4]};
`

export { Section, Form, ButtonContainer };