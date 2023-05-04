import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.font.primary};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: ${({ theme }) => theme.padding[2]};
  span {
    font-weight: 100;
    padding-left: ${({ theme }) => theme.padding[1]};
  }
  button {
    width: 20%;
    height: 100%;
    background-color: transparent;
    border: none;
    text-align: right;
  }
`;

export { Section, Header };
