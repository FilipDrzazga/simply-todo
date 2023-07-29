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

const TodoTask = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const itemRef = useRef(null);

  const deleteTask = (boardId, taskId) => {
    dispatch(removeTaskFromDB({ boardId: boardId, taskId: taskId }));
  };

  const taskDone = (taskId) => {
    dispatch(setTaskStatus({ status: true, taskId: taskId }));
    dispatch(updateBoardTasksArraysDB());
  };

  const handleItemClick = (e, taskId) => {
    const item = itemRef.current;
    item.style.height = "auto";
    item.style.height = `${item.scrollHeight}px`;
    if (e.target.tagName === "LI") {
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

  const displayTask = () => {
    return (
      user.activeBoard && (
        <S.TaskSection>
          <S.TaskList>
            {user.activeBoard.map((item) => {
              return item.tasks.map((task) =>
                task.isEditing ? (
                  <S.TaskItem key={task.taskId} id={task.taskId}>
                    <S.Textarea
                      ref={textareaRef}
                      type="text"
                      defaultValue={task.taskName}
                      onChange={() => handleResizeTextarea()}
                      autoFocus
                    />
                    <S.ApproveChangeBtn onClick={() => handleChangeApprove(task.taskId, item.boardId)}>
                      <Icon iconName="circle-check" iconType="far" iconColor="checkbox" size="lg" />
                    </S.ApproveChangeBtn>
                    <S.DeleteBtn onClick={() => deleteTask(item.boardId, task.taskId)}>
                      <Icon iconName="trash-can" iconType="far" iconColor="delete" size="lg" />
                    </S.DeleteBtn>
                  </S.TaskItem>
                ) : (
                  <S.TaskItem
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
                )
              );
            })}
          </S.TaskList>
        </S.TaskSection>
      )
    );
  };
  return displayTask();
};

export default TodoTask;
