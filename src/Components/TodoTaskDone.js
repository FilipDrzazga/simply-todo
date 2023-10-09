import React, { useState } from "react";
import Icon from "./Icon";

import { useDispatch, useSelector } from "react-redux";
import { setTaskStatus, updateBoardTasksArraysDB } from "../store/userSlice";
import * as S from "../styled/TodoTaskDone.styled";

const TodoTaskDone = ({ variants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const displayDoneTask = () => {
    setIsOpen(!isOpen);
  };

  const taskUndone = (taskId) => {
    dispatch(setTaskStatus({ status: false, taskId: taskId }));
    dispatch(updateBoardTasksArraysDB());
  };

  return (
    <S.TaskDoneSection variants={variants}>
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
          <S.TaskDoneItem></S.TaskDoneItem>
        </S.TaskDoneList>
      )}
    </S.TaskDoneSection>
  );
};

export default TodoTaskDone;
