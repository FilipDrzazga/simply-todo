import React, { useState } from "react";
import Icon from "./Icon";

import { useDispatch, useSelector } from "react-redux";
import { setTaskStatus } from "../store/userSlice";
import * as S from "../styled/TodoTaskDone.styled";

const TodoTaskDone = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const displayDoneTask = () => {
    setIsOpen(!isOpen);
  };

  const taskUndone = (taskId) => {
    dispatch(setTaskStatus({ status: false, taskId: taskId }));
  };

  return (
    <S.TaskDoneSection>
      <S.TaskDoneDisplayBtn onClick={() => displayDoneTask()}>
        Done ({user.activeBoard[0] && user.activeBoard[0].tasksDone.length})
        <Icon iconName="caret-down" iconType="fas" size="sm" isRotate={isOpen} />
      </S.TaskDoneDisplayBtn>
      {isOpen && (
        <S.TaskDoneList>
          {user.activeBoard[0].tasksDone.map((task) => (
            <S.TaskDoneItem key={task.taskId}>
              <S.UncompleteTaskBtn onClick={() => taskUndone(task.taskId)}>
                <Icon iconName="circle" iconType="fas" iconColor="checkbox" />
              </S.UncompleteTaskBtn>
              {task.taskName}
            </S.TaskDoneItem>
          ))}
        </S.TaskDoneList>
      )}
    </S.TaskDoneSection>
  );
};

export default TodoTaskDone;
