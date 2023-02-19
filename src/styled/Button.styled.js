import styled from "styled-components";

const Button = styled.button`
    width: ${({ size }) => size === 'xl' ? '100%' : '60%'};
    height: 3.5rem;
    border:none;
    border-radius:15px;
    background-color:${({ color, theme }) => color === 'dark'? theme.colors.purple : theme.colors.lightPurple};
    color:${({ color, theme }) => color === 'dark' ? theme.colors.white : theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-weight: 300;
    letter-spacing: 2px;
    word-spacing:1px;
    ${({disabled})=> disabled && 'opacity: 0.4'};
`

export { Button };