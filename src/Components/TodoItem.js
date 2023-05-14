import React from "react";
import * as S from "../styled/TodoItem.styled";
import Icon from "./Icon";

import { useSelector } from "react-redux";

const TodoItem = () => {
  const { userTodos } = useSelector((state) => state.user);
  return (
    <S.TasksSection>
      <S.TaskList>
        {userTodos &&
          userTodos.map((item) =>
            item.tasks.map((todo, id) => (
              <S.TaskItem id={id} key={todo.taskId}>
                <Icon iconColor="checkbox" iconType="far" iconName="circle" />
                {todo.taskName}
              </S.TaskItem>
            ))
          )}
      </S.TaskList>
    </S.TasksSection>
  );
};

export default TodoItem;
