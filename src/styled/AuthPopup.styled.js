import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "./theme";

const Section = styled(motion.section)`
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.background.white};
  z-index: 999;
  @media ${breakpoints.laptop} {
    width: 25%;
  }
`;
const Header = styled.header`
  width: 80%;
  margin-left: 16px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  text-align: center;
`;
const IconContainer = styled.div`
  color: ${({ iconColor, theme }) => iconColor && theme.colors.icon[iconColor]};
`;

export { Section, Header, IconContainer };
