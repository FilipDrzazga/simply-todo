import styled from "styled-components";

const TaskSection = styled.section`
  width: 100%;
  border-bottom: solid 0.5px ${({ theme }) => theme.colors.borderLine};
`;
const TaskList = styled.ul`
  width: 100%;
  padding: ${({ theme }) => theme.padding[2]};
  list-style-type: none;
`;
const TaskItem = styled.li`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin[2]};
  margin-top: ${({ theme }) => theme.margin[2]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: lighter;
`;

const CompleteTaskBtn = styled.button`
  width: 10%;
  height: 100%;
  background-color: transparent;
  border: none;
`;

const DeleteBtn = styled.button`
  margin-left: auto;
  margin-right: 10px;
  background-color: transparent;
  border: none;
`;

export { TaskSection, TaskList, TaskItem, CompleteTaskBtn, DeleteBtn };
