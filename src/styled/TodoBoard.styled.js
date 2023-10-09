import styled from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

const BoardNav = styled(motion.nav)`
  width: 100%;
  min-height: 3rem;
  height: 3rem;
  max-height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  font-weight: lighter;
  letter-spacing: 1px;
  white-space: nowrap;
  a {
    text-decoration: none;
    color: white;
  }
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
  @media ${breakpoints.laptop} {
    cursor: pointer;
  }
`;

const SelectedBoardItem = styled(motion.div)`
  position: absolute;
  top: 98%;
  left: 0px;
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.background.green};
  border-radius: 3px;
`;

const AddBoardBtn = styled.button`
  min-width: 50px;
  height: 100%;
  background-color: transparent;
  border: none;
`;

export { BoardNav, BoardList, BoardItem, SelectedBoardItem, AddBoardBtn };
