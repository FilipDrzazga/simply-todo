import styled from "styled-components";

const TaskDoneSection = styled.section`
  width: 100%;
  overflow: auto;
`;

const TaskDoneDisplayBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 30%;
  margin-top: ${({ theme }) => theme.margin[3]};
  padding-left: ${({ theme }) => theme.padding[4]};
  padding-right: ${({ theme }) => theme.padding[5]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.font.primary};
  border: none;
`;

const TaskDoneList = styled.ul`
  padding-left: ${({ theme }) => theme.padding[2]};
  list-style-type: none;
`;

const TaskDoneItem = styled.li`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin[2]};
  margin-top: ${({ theme }) => theme.margin[2]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: lighter;
  button {
    width: 10%;
    height: 100%;
    background-color: transparent;
    border: none;
  }
`;

export { TaskDoneSection, TaskDoneDisplayBtn, TaskDoneList, TaskDoneItem };
