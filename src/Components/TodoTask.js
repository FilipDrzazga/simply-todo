import React from "react";
import * as S from "../styled/TodoTask.styled";
import Icon from "./Icon";

import { useDispatch, useSelector } from "react-redux";
import { removeTaskFromDB, setTaskStatus } from "../store/userSlice";

const TodoTask = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteTask = (boardId, taskId) => {
    dispatch(removeTaskFromDB({ boardId: boardId, taskId: taskId }));
  };

  const taskDone = (taskId) => {
    dispatch(setTaskStatus({ status: true, taskId: taskId }));
  };

  const displayTask = () => {
    return (
      user.activeBoard && (
        <S.TaskSection>
          <S.TaskList>
            {user.activeBoard.map((item) =>
              item.tasks.map((task) => (
                <S.TaskItem key={task.taskId} id={task.taskId}>
                  <S.CompleteTaskBtn onClick={() => taskDone(task.taskId)}>
                    <Icon iconName="circle" iconType="far" iconColor="checkbox" />
                  </S.CompleteTaskBtn>
                  {task.taskName}
                  <S.DeleteBtn onClick={() => deleteTask(task.boardId, task.taskId)}>
                    <Icon iconName="trash-can" iconType="far" iconColor="delete" size="lg" />
                  </S.DeleteBtn>
                </S.TaskItem>
              ))
            )}
          </S.TaskList>
        </S.TaskSection>
      )
    );
  };
  return displayTask();
};

export default TodoTask;
