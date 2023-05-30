import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
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
  padding: ${({ theme }) => theme.padding[3]};
  h1 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: lighter;
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

const Nav = styled.nav`
  width: 100%;
  height: 10%;
  display: flex;
  border-bottom: solid 0.5px ${({ theme }) => theme.colors.borderLine};
`;
const BoardList = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-beatween;
  align-items: center;
  gap: 15px;
  list-style-type: none;
  overflow-x: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoardItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  font-weight: lighter;
  letter-spacing: 1px;
  white-space: nowrap;
  a {
    text-decoration: none;
    color: white;
  }
`;

const AddBoardBtn = styled.button`
  min-width: 50px;
  height: 100%;
  background-color: transparent;
  border: none;
`;

export { Section, Header, Nav, BoardList, BoardItem, AddBoardBtn };
