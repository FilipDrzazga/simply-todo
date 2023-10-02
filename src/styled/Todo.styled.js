import styled from "styled-components";
import { breakpoints } from "./theme";

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.font.primary};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 5rem;
  padding: ${({ theme }) => theme.padding[3]};
  h1 {
    width:80%;
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: lighter;
    padding-left: ${({ theme }) => theme.padding[1]};
  }
  }
  @media ${breakpoints.tablet} {
    h1{
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
    span{
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
  }
`;

const NotificationBtn = styled.button`
  width: 15%;
  height: 100%;
  background-color: transparent;
  border: none;
  @media ${breakpoints.tablet} {
    text-align: center;
  }
`;
const SignOutBtn = styled.button`
  width: 15%;
  height: 100%;
  background-color: transparent;
  border: none;
  text-align: center;
`;

const AddTaskBtn = styled.button`
  position: fixed;
  bottom: 4rem;
  left: 80%;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.colors.button.add};
  color: ${({ theme }) => theme.colors.font.secendary};
  border-radius: 50px;
  border: none;
  @media ${breakpoints.tablet} {
    bottom: 6rem;
    left: 90%;
    width: 4rem;
    height: 4rem;
  }
`;

export { Section, Header, NotificationBtn, SignOutBtn, AddTaskBtn };
