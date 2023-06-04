import React from "react";
import * as S from "../styled/TodoTask.styled";
import Icon from "./Icon";

import { useSelector } from "react-redux";

const TodoTask = () => {
  const user = useSelector((state) => state.user);

  const displayTask = () => {
    return (
      user.activeBoard && (
        <S.TaskSection>
          <S.TaskList>
            {user.activeBoard.map((item) =>
              item.tasks.map((task) => (
                <S.TaskItem key={task.taskId} id={task.taskId}>
                  <button>
                    <Icon iconName="circle" iconType="far" iconColor="checkbox"></Icon>
                  </button>
                  {task.taskName}
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
