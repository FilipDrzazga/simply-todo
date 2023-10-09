import React, { useState, useEffect } from "react";
import Icon from "./Icon";

import { useDispatch, useSelector } from "react-redux";
import { setTaskStatus, updateBoardTasksArraysDB } from "../store/userSlice";
import * as S from "../styled/TodoTaskDone.styled";
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

const TodoTaskDone = ({ variants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ripplePos, setRipplePos] = useState({ posX: -1, posY: -1 });
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ripplePos.posX !== -1 && ripplePos.posY !== -1) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 300);
    } else {
      setIsClicked(false);
    }
  }, [ripplePos]);

  useEffect(() => {
    if (!isClicked) setRipplePos({ posX: -1, posY: -1 });
  }, [isClicked]);

  const displayDoneTask = (e) => {
    setIsClicked(true);
    const rect = e.target.getBoundingClientRect();
    setRipplePos({ posX: e.clientX - rect.left, posY: e.clientY - rect.top });
    setIsOpen(!isOpen);
  };

  const taskUndone = (taskId) => {
    dispatch(setTaskStatus({ status: false, taskId: taskId }));
    dispatch(updateBoardTasksArraysDB());
  };

  const rippleAnimationVariants = {
    hidden: { opacity: 0, width: 0, height: 0 },
    visible: {
      opacity: 1,
      top: ripplePos.posY - 100,
      left: ripplePos.posX - 100,
      width: 200,
      height: 200,
      transition: { opacity: { duration: 2 } },
    },
    tap: {
      opacity: 1,
      top: ripplePos.posY - 100,
      left: ripplePos.posX - 100,
      width: 200,
      height: 200,
      transition: { opacity: { duration: 2 } },
    },
  };

  return (
    <S.TaskDoneSection variants={variants}>
      <S.TaskDoneDisplayBtn layout onClick={(e) => displayDoneTask(e)}>
        Done ({user.activeBoard[0] && user.activeBoard[0].tasksDone.length})
        <Icon iconName="caret-down" iconType="fas" size="sm" isRotate={isOpen} />
        {isClicked && (
          <S.RippleAnimation
            variants={rippleAnimationVariants}
            initial="hidden"
            animate={isClicked && "visible"}
            whileTap="tap"
            style={{ top: ripplePos.posY - 10, left: ripplePos.posX - 10, borderRadius: "50%" }}
          ></S.RippleAnimation>
        )}
      </S.TaskDoneDisplayBtn>
      {isOpen && (
        <S.TaskDoneList>
          {user.activeBoard[0].tasksDone.map((task, i) => (
            <AnimatePresence key={task.taskId}>
              <S.TaskDoneItem
                variants={tasksVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                exit="exit"
                key={task.taskId}
              >
                <S.UncompleteTaskBtn onClick={() => taskUndone(task.taskId)}>
                  <Icon iconName="circle" iconType="fas" iconColor="checkbox" />
                </S.UncompleteTaskBtn>
                {task.taskName}
              </S.TaskDoneItem>
            </AnimatePresence>
          ))}
          <S.TaskDoneItem></S.TaskDoneItem>
        </S.TaskDoneList>
      )}
    </S.TaskDoneSection>
  );
};

export default TodoTaskDone;
