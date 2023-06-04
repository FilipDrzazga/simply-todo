import React, { useEffect } from "react";
import * as S from "../styled/Todo.styled";
import Icon from "../Components/Icon";
import Button from "../Components/Button";
import TodoBoard from "../Components/TodoBoard";
import TodoTask from "../Components/TodoTask";
import TodoListSettings from "../Components/TodoListSettings";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, onAuthStateChanged, signOut } from "../firebase/firebase";
import { queryUserData, queryUserTodos } from "../store/userSlice";

const Todo = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(queryUserData(user.uid));
        dispatch(queryUserTodos(user.uid));
      } else {
        // user is signout, save data to db
        navigate("/");
      }
    });
  }, []);

  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // add some popup 'Are you sure to logout?'
      console.log("error from signOut/"`${error.message}`);
    }
  };

  return (
    <S.Section>
      <S.Header>
        <h1>
          Hello,<span>{user.userData.username}</span>
        </h1>
        <button onClick={() => userSignOut()}>
          <Icon size="xl" iconName="arrow-right-from-bracket" />
        </button>
      </S.Header>
      <TodoBoard />
      <TodoTask />
      <Button position="absolute" circle="true">
        <Icon iconName="plus" size="lg"></Icon>
      </Button>
      <TodoListSettings />
    </S.Section>
  );
};

export default Todo;
