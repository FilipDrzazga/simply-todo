import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const Button = styled(motion.button)`
  ${({ position }) =>
    position === "absolute" &&
    css`
      position: absolute;
      bottom: 80px;
      right: 20px;
    `}
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
      margin-bottom: ${({ theme }) => theme.margin[3]};
      color: ${theme.colors.font.primary};
      border: 2px solid ${theme.colors.button.secondary};
    `}
  ${({ theme, circle }) =>
    circle &&
    css`
      width: 3.5rem;
      height: 3.5rem;
      background-color: ${({ theme }) => theme.colors.button.add};
      color: ${theme.colors.font.secondary};
      border-radius: 50px;
    `}
`;

export { Button };
