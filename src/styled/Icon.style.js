import styled from "styled-components";

const Container = styled.div`
    color:${({ iconColor, theme }) => iconColor === 'green' ? theme.colors.inputCorrect : theme.colors.inputError };
`

export { Container };