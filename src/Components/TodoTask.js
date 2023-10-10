import React, { useRef } from "react";
import * as S from "../styled/TodoTask.styled";
import Icon from "./Icon";

import { useDispatch, useSelector } from "react-redux";
import {
  removeTaskFromDB,
  setEditingComplete,
  setIsEditing,
  setTaskStatus,
  updateBoardTasksArraysDB,
} from "../store/userSlice";
import { AnimatePresence } from "framer-motion";

const tasksVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: -50 * i,
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.025,
    },
  }),
  exit: {
    opacity: 0,
    transition: { opacity: { duration: 2 } },
  },
};

const btnVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, scale: [1, 1.2, 1], transition: { scale: { type: "spring", stiffnes: 300 } } },
};

const TodoTask = ({ variants }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const itemRef = useRef(null);

  const deleteTask = (boardId, taskId) => {
    const textareaValue = textareaRef.current.value;
    dispatch(setEditingComplete({ taskId: taskId, boardId: boardId, newTaskName: textareaValue }));
    dispatch(removeTaskFromDB({ boardId: boardId, taskId: taskId }));
  };

  const taskDone = (taskId) => {
    dispatch(setTaskStatus({ status: true, taskId: taskId }));
    dispatch(updateBoardTasksArraysDB());
  };

  const handleItemClick = (e, taskId) => {
    if (e.target.tagName === "LI") {
      const item = itemRef.current;
      item.style.height = "auto";
      item.style.height = `${item.scrollHeight}px`;
      dispatch(setIsEditing(taskId));
    }
  };

  const handleChangeApprove = (taskId, boardId) => {
    const textareaValue = textareaRef.current.value;
    dispatch(setEditingComplete({ taskId: taskId, boardId: boardId, newTaskName: textareaValue }));
  };

  const handleResizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    user.activeBoard && (
      <S.TaskSection layout variants={variants}>
        <S.TaskList>
          {user.activeBoard.map((item) => {
            return item.tasks.map((task, i) =>
              task.isEditing ? (
                <S.TaskItem key={task.taskId} id={task.taskId}>
                  <S.Textarea
                    ref={textareaRef}
                    type="text"
                    defaultValue={task.taskName}
                    onChange={() => handleResizeTextarea()}
                    autoFocus
                  />
                  <S.ApproveChangeBtn
                    variants={btnVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleChangeApprove(task.taskId, item.boardId)}
                  >
                    <Icon iconName="circle-check" iconType="far" iconColor="checkbox" size="lg" />
                  </S.ApproveChangeBtn>
                  <S.DeleteBtn
                    variants={btnVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => deleteTask(item.boardId, task.taskId)}
                  >
                    <Icon iconName="trash-can" iconType="far" iconColor="delete" size="lg" />
                  </S.DeleteBtn>
                </S.TaskItem>
              ) : (
                <AnimatePresence key={task.taskId}>
                  <S.TaskItem
                    variants={tasksVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={i}
                    layout
                    ref={itemRef}
                    onClick={(e) => handleItemClick(e, task.taskId)}
                    key={task.taskId}
                    id={task.taskId}
                  >
                    <S.CompleteTaskBtn onClick={() => taskDone(task.taskId)}>
                      <Icon iconName="circle" iconType="far" iconColor="checkbox" />
                    </S.CompleteTaskBtn>
                    {task.taskName}
                  </S.TaskItem>
                </AnimatePresence>
              )
            );
          })}
        </S.TaskList>
      </S.TaskSection>
    )
  );
};

export default TodoTask;
