import React, { useEffect, useState } from "react";
import * as S from "../styled/Todo.styled";
import Icon from "../Components/Icon";
import TodoList from "../Components/TodoList";
import TodoItem from "../Components/TodoItem";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addDoc, collection, db } from "../firebase/firebase";
import { queryUserTodos } from "../store/userSlice";

const Todo = () => {
  const {
    state: { isNewUser },
  } = useLocation();
  const [isNew, setIsNew] = useState(isNewUser);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addBoardForNewUser = async () => {
    await addDoc(collection(db, "usersTodos"), {
      userId: userData.userId,
      boardName: "My task",
      tasks: [
        { taskName: "Add new board", isDone: false },
        { taskName: "Add new task", isDone: false },
      ],
      tasksDone: [],
    });
    return setIsNew(false);
  };

  useEffect(() => {
    isNew ? addBoardForNewUser() : dispatch(queryUserTodos());
  }, [isNew, dispatch]);

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
