import React, { useEffect } from "react";
import * as S from "../styled/Todo.styled";
import Icon from "../Components/Icon";
import TodoList from "../Components/TodoList";
import TodoItem from "../Components/TodoItem";

import { useDispatch, useSelector } from "react-redux";
import { queryUserTodos } from "../store/userSlice";
import { createBoardForNewUser } from "../utils";

const Todo = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    userData.isNewUser ? createBoardForNewUser(userData) : dispatch(queryUserTodos());
  }, [userData]);

  return (
    <S.Section>
      <S.Header>
        <h1>
          Hello,<span>{userData.username}</span>
        </h1>
        <button>
          <Icon size="xl" iconName="arrow-right-from-bracket" />
        </button>
      </S.Header>
      <TodoList />
      <TodoItem />
    </S.Section>
  );
};

export default Todo;
