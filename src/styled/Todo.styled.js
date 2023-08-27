import styled from "styled-components";

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
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: lighter;
    padding-left: ${({ theme }) => theme.padding[1]};
  }
  }
`;

const NotificationBtn = styled.button`
  width: 15%;
  height: 100%;
  margin-left: 20px;
  background-color: transparent;
  border: none;
  text-align: right;
`;
const SignOutBtn = styled.button`
  width: 15%;
  height: 100%;
  background-color: transparent;
  border: none;
  text-align: right;
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
`;

export { Section, Header, NotificationBtn, SignOutBtn, AddTaskBtn };
