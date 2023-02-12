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
            align-self:flex-start;
            margin-left:${({theme})=>theme.margin[3]};
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
const ButtonContainer = styled.div`
    position:absolute;
    bottom:0;
    left:50%;
    transform:translate(-50%, -20%);
`

export { Section, ButtonContainer };