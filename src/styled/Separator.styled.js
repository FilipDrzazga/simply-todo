import styled from "styled-components";
import { breakpoints } from "./theme";

const SeparatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.margin[1]};
  margin-bottom: ${({ theme }) => theme.margin[1]};
  color: ${({ theme }) => theme.colors.font.primary};
`;

const Line = styled.hr`
  width: 30%;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  border: none;
  border-top: 1px solid;
`;

const Span = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[0]};
  font-weight: lighter;
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;

export { SeparatorContainer, Line, Span };
