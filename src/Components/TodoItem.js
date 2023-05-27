import React from "react";
import * as S from "../styled/TodoItem.styled";
import Icon from "./Icon";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TodoItem = () => {
  const { userTodos } = useSelector((state) => state.user);
  const { boardId } = useParams();

  const filterTodosByBoardId = () => {
    const filtered = userTodos.filter((item) => item.boardId === boardId);
    return (
      userTodos &&
      filtered.map((item) =>
        item.tasks.map((todo, id) => (
          <S.Item id={id} key={todo.taskId}>
            <Icon iconColor="checkbox" iconType="far" iconName="circle" />
            {todo.taskName}
          </S.Item>
        ))
      )
    );
  };

  return (
    <S.Section>
      <S.List>{filterTodosByBoardId()}</S.List>
    </S.Section>
  );
};

export default TodoItem;
