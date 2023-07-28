import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const Button = styled(motion.button)`
  width: ${({ size }) => size};
  height: 3.5rem;
  border: none;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.button.primary};
  color: ${({ theme }) => theme.colors.font.primary};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  font-weight: lighter;
  ${({ disabled }) => disabled && "opacity: 0.4"};
  ${({ theme, secondary }) =>
    secondary &&
    css`
      background-color: transparent;
      margin-bottom: ${theme.margin[3]};
      color: ${theme.colors.font.primary};
      border: 2px solid ${theme.colors.button.secondary};
    `};
  ${({ theme, removebtn }) =>
    removebtn &&
    css`
      background-color: ${theme.colors.button.delete};
    `};
`;

export { Button };
