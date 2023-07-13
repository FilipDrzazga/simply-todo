import React from "react";
import * as S from "../styled/TodoTask.styled";
import Icon from "./Icon";

import { useDispatch, useSelector } from "react-redux";
import { removeTaskFromDB } from "../store/userSlice";

const TodoTask = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(removeTaskFromDB);

  const deleteTask = (boardId, taskId) => {
    console.log(taskId);
    dispatch(removeTaskFromDB({ boardId: boardId, taskId: taskId }));
  };

  const completeTask = () => {
    console.log("ok");
  };

  const displayTask = () => {
    return (
      user.activeBoard && (
        <S.TaskSection>
          <S.TaskList>
            {user.activeBoard.map((item) =>
              item.tasks.map((task) => (
                <S.TaskItem key={task.taskId} id={task.taskId}>
                  <button onClick={() => completeTask()}>
                    <Icon iconName="circle" iconType="far" iconColor="checkbox" />
                  </button>
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
