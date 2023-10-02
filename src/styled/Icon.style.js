import styled from "styled-components";
import { breakpoints } from "./theme";

const Container = styled.div`
  color: ${({ iconColor, theme }) => iconColor && theme.colors.icon[iconColor]};
  transform: ${({ isRotate }) => isRotate && "rotate(180deg)"};
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;

export { Container };
