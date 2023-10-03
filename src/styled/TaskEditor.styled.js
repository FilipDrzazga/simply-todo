import styled from "styled-components";
import { breakpoints } from "./theme";

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
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  padding-bottom: ${({ theme }) => theme.padding[5]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 15px;
  @media ${breakpoints.laptop} {
    width: 30%;
  }
`;

export { Section, Form };
