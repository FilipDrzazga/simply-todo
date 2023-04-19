import styled, { css } from "styled-components";
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
    width: ${({ size }) => size };
    height: 3.5rem;
    border:none;
    border-radius:15px;
    background-color:${({ color, theme }) => color === 'dark'? theme.colors.purple : theme.colors.lightPurple};
    color:${({ color, theme }) => color === 'dark' ? theme.colors.white : theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-weight: 300;
    letter-spacing: 1px;
    word-spacing:1px;
    ${({ disabled }) => disabled && 'opacity: 0.4'};
    ${({ circle }) => circle && css`
        width:3.5rem;
        height:3.5rem;
        border-radius: 50px;
    `}
`

export { Button };