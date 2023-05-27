import styled from "styled-components";

const Section = styled.section`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  backdrop-filter: blur(3px);
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  // height: 40%;
  padding-bottom: ${({ theme }) => theme.padding[5]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 15px;
`;

export { Section, Form };
