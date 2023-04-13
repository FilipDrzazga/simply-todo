import styled from "styled-components";

const Container = styled.div`
    color:${({ iconColor, theme }) => iconColor && theme.colors[iconColor]  };
`

export { Container };