import styled from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
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

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 90%;
  padding: ${({ theme }) => theme.padding[3]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 15px;
  text-align: center;
  @media ${breakpoints.laptop} {
    width: 30%;
  }
`;
const Text = styled.p`
  line-height: 1.3rem;
  font-weight: lighter;
`;

export { Section, Container, Text };
