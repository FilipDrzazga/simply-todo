import React, { useState, useEffect } from "react";
import * as S from "../styled/Todo.styled";
import Icon from "../Components/Icon";
import TodoBoard from "../Components/TodoBoard";
import TodoTask from "../Components/TodoTask";
import TodoListSettings from "../Components/TodoListSettings";
import TaskEditor from "../Components/TaskEditor";
import Notifications from "../Components/Notifications";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, onAuthStateChanged, signOut } from "../firebase/firebase";
import { startSubscriptionTodos, queryAllSharedBoardsBy, queryUserData, queryUserTodos } from "../store/userSlice";
import TodoTaskDone from "../Components/TodoTaskDone";

const Todo = () => {
  const user = useSelector((state) => state.user);
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(queryUserData(user.uid));
        dispatch(queryUserTodos(user.uid));
        dispatch(queryAllSharedBoardsBy(user.uid));
      } else {
        // user is signout, save data to db
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    if (user.userData?.userId) {
      dispatch(startSubscriptionTodos(user.userData.userId));
    }
  }, [dispatch, user.userData.userId]);

  // const userSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //   } catch (error) {
  //     // add some popup 'Are you sure to logout?'
  //     console.log("error from signOut/"`${error.message}`);
  //   }
  // };

  const handleClickNotifications = () => {
    setDisplayNotifications(!displayNotifications);
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
        <button onClick={() => handleClickNotifications()}>
          <Icon
            size="xl"
            iconName="bell"
            iconType={user.isNewInvitation ? "fas" : "far"}
            iconColor={user.isNewInvitation ? "checkbox" : "default"}
          />
        </button>
      </S.Header>
      <TodoBoard />
      <TodoTask />
      <TodoTaskDone />
      <TodoListSettings />
      <S.AddTaskBtn onClick={() => addNewTask()}>
        <Icon iconName="plus" size="lg"></Icon>
      </S.AddTaskBtn>
      {displayNotifications && <Notifications handleClickNotifications={handleClickNotifications} />}
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
