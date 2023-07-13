import styled from "styled-components";

const TaskCompleteSection = styled.section`
  width: 100%;
  overflow: auto;
`;

const TaskCompleteHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  padding-left: 1.2rem;
  padding-right: 0.7rem;
  padding-bottom: 0;
  button {
    width: 10%;
    height: 100%;
    mrgin-left: auto;
    background-color: transparent;
    border: none;
  }
`;

const TaskCompleteList = styled.ul`
  padding: ${({ theme }) => theme.padding[2]};
  list-style-type: none;
`;

const TaskCompleteItem = styled.li`
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

export { TaskCompleteSection, TaskCompleteHeader, TaskCompleteList, TaskCompleteItem };
