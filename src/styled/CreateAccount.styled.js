import styled from "styled-components";

const Section = styled.section`
    position:relative;
    width:100%;
    height:100%;
    header{
        position: absolute;
        top:0;
        left:0;
        transform:translateY(60%);
        width:100%;
        display:flex;
        align-items:center;
        flex-direction:column;
        flex-wrap:wrap;
        h1{
            font-size:${({theme})=>theme.fontSizes[4]};
            color:${({theme})=>theme.colors.darkPurple};
        }
        h2{
            font-size:${({ theme }) => theme.fontSizes[1]};
            font-weight: 400;
            color:${({theme})=>theme.colors.darkPurple};
        }
    }
    img{
        width:100%;
        height:100vh;
    }
`

const Form = styled.form`
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    height:70%;
    border-radius:20px 20px 0 0;
    background-color:${({theme})=>theme.colors.lightGray};
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:${({theme})=>theme.padding[4]}
`

const InputsContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    gap:${({theme})=>theme.margin[1]};
    margin-top:${({theme})=>theme.margin[0]};
`

const ButtonContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction;column;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    gap:${({theme})=>theme.margin[2]};
    margin-top:${({ theme }) => theme.margin[5]};
    div{
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        hr{
            width:30%;
            margin-right: 0.5rem;
            margin-left: 0.5rem;
            border: none;
            border-top: 1px solid;
            color:${({theme})=>theme.colors.darkPurple};
        }
        span{
            font-size:${({theme})=>theme.fontSizes[0]};
            color:${({theme})=>theme.colors.darkPurple};
        }
    }
`

export { Section, Form, InputsContainer, ButtonContainer };