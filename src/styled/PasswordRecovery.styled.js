import styled from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  @media ${breakpoints.laptop} {
    align-items: center;
  }
`;

const Form = styled(motion.form)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  @media ${breakpoints.laptop} {
    width: 30%;
    justify-content: center;
  }
`;

const ButtonContainer = styled(motion.div)`
  width: 100%;
  margin-top: ${({ theme }) => theme.margin[1]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export { Section, Form, ButtonContainer };
