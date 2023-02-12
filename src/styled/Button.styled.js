import styled from "styled-components";

const Button = styled.button`
    width: 17rem;
    height: 3rem;
    margin-bottom: ${({ theme }) => theme.margin[3]};
    border:none;
    border-radius:15px;
    background-color:${({ color, theme }) => color === 'dark'? theme.colors.purple : theme.colors.lightPurple};
    color:${({ color, theme }) => color === 'dark' ? theme.colors.white : theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-weight: 400;
    letter-spacing: 2px;
    word-spacing:1px
`

export { Button };