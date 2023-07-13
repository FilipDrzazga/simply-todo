import React, { useState, useEffect } from "react";
import * as S from "../styled/Todo.styled";
import Icon from "../Components/Icon";
import TodoBoard from "../Components/TodoBoard";
import TodoTask from "../Components/TodoTask";
import TodoListSettings from "../Components/TodoListSettings";
import TaskEditor from "../Components/TaskEditor";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, onAuthStateChanged, signOut } from "../firebase/firebase";
import { queryUserData, queryUserTodos } from "../store/userSlice";
import TodoTaskComplete from "../Components/TodoTaskComplete";

const Todo = () => {
  const user = useSelector((state) => state.user);
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
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

  const addNewTask = () => {
    setDisplayTaskEditor(true);
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
      <TodoTaskComplete />
      <S.AddTaskBtn onClick={() => addNewTask()}>
        <Icon iconName="plus" size="lg"></Icon>
      </S.AddTaskBtn>
      <TodoListSettings />
      {displayTaskEditor && (
        <TaskEditor
          validateField="addTask"
          id="addTask"
          htmlFor="addTask"
          placeholder="Enter new task..."
          buttonText="Add"
          labelText="Add task:"
          setDisplayTaskEditor={setDisplayTaskEditor}
        />
      )}
    </S.Section>
  );
};

export default Todo;
