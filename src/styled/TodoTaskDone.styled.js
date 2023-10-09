import styled from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

const TaskDoneSection = styled(motion.section)`
  width: 100%;
  min-height: 115px;
`;

const TaskDoneDisplayBtn = styled(motion.button)`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  padding-left: ${({ theme }) => theme.padding[4]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.font.primary};
  border: none;
  overflow: hidden;
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
  @media ${breakpoints.laptop} {
    cursor: pointer;
  }
`;

const RippleAnimation = styled(motion.div)`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 5px;
  height: 5px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
`;

const TaskDoneList = styled.ul`
  width: 100%;
  padding: ${({ theme }) => theme.padding[2]};
  list-style-type: none;
`;

const TaskDoneItem = styled(motion.li)`
  width: 100%;
  // height: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin[2]};
  margin-top: ${({ theme }) => theme.margin[2]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: lighter;
  overflow-wrap: break-word;
  &:last-child {
    height: 40px;
  }
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
`;

const UncompleteTaskBtn = styled.button`
  min-width: 10%;
  height: 100%;
  background-color: transparent;
  border: none;
  @media ${breakpoints.laptop} {
    min-width: 5%;
  }
`;

export { TaskDoneSection, TaskDoneDisplayBtn, RippleAnimation, TaskDoneList, TaskDoneItem, UncompleteTaskBtn };
