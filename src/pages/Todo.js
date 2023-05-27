import React, { useEffect } from "react";
import * as S from "../styled/Todo.styled";
import Icon from "../Components/Icon";
import TodoList from "../Components/TodoList";
import TodoListSettings from "../Components/TodoListSettings";
import Button from "../Components/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../firebase/firebase";
import { queryUserData, queryUserTodos } from "../store/userSlice";

const Todo = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // add some popup 'Are you sure to logout?'
      console.log("error from signOut/"`${error.message}`);
    }
  };

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
  return (
    <S.Section>
      <S.Header>
        <h1>
          Hello,<span>{userData.username}</span>
        </h1>
        <button onClick={() => handleUserSignOut()}>
          <Icon size="xl" iconName="arrow-right-from-bracket" />
        </button>
      </S.Header>
      <TodoList />
      <Outlet />
      <Button position="absolute" circle="true">
        <Icon iconName="plus" size="lg"></Icon>
      </Button>
      <TodoListSettings />
    </S.Section>
  );
};

export default Todo;
