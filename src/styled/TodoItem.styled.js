import styled from "styled-components";

const TasksSection = styled.section`
  width: 100%;
  border-bottom: solid 0.5px ${({ theme }) => theme.colors.borderLine};
`;
const TaskList = styled.ul`
  padding: ${({ theme }) => theme.padding[2]};
  list-style-type: none;
`;
const TaskItem = styled.li`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: 300;
  button {
    width: 10%;
    height: 100%;
    // text-align:left;
    background-color: transparent;
    border: none;
  }
`;

export { TasksSection, TaskList, TaskItem };
