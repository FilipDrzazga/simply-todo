import styled from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.primary};
  @media ${breakpoints.laptop} {
    align-items: center;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 50%;
`;

const ButtonContainer = styled(motion.div)`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.margin[2]};
  margin-bottom: ${({ theme }) => theme.margin[3]};
  @media ${breakpoints.laptop} {
    width: 30%;
    justify-content: center;
  }
`;

export { Section, Header, ButtonContainer };
