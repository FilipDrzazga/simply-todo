import styled from "styled-components";

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
  font-size: ${({ theme }) => theme.fontSizes[0]};
  font-weight: lighter;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const AddListBtn = styled.button`
  min-width: 50px;
  height: 100%;
  background-color: transparent;
  border: none;
`;

export { Nav, BoardList, BoardItem, AddListBtn };
