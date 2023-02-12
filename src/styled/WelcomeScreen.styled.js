import styled from "styled-components";

const Section = styled.section`
    position:relative;
    width:100%;
    height:100%;
    img{
        width:100%;
        height:100vh;
    }
`
const ButtonContainer = styled.div`
    position:absolute;
    bottom:0;
    left:50%;
    transform:translate(-50%, -50%);
`

export { Section, ButtonContainer };