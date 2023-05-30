import React, { useState } from "react";
import Icon from "./Icon";
import * as S from "../styled/TodoBoard.styled";

import { useDispatch, useSelector } from "react-redux";
import { setActiveTodoBoard } from "../store/userSlice";
import TaskEditor from "./TaskEditor";

const TodoBoard = () => {
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const displayBoards = () => {
    return (
      user.userTodos && (
        <S.BoardList>
          {user.userTodos.map((item) => (
            <S.BoardItem
              onClick={() => dispatch(setActiveTodoBoard({ setActiveBoard: [{ ...item }] }))}
              id={item.boardId}
              key={item.boardId}
            >
              {item.boardName}
            </S.BoardItem>
          ))}
        </S.BoardList>
      )
    );
  };

  return (
    <>
      <S.BoardNav>
        <S.AddBoardBtn onClick={() => setDisplayTaskEditor(true)}>
          <Icon iconName="plus" />
        </S.AddBoardBtn>
        {displayBoards()}
      </S.BoardNav>
      {displayTaskEditor && (
        <TaskEditor
          validateField="addBoard"
          id="addBoard"
          htmlFor="addBoard"
          placeholder="Enter board name..."
          buttonText="Add"
          labelText="Enter board name:"
          setDisplayTaskEditor={setDisplayTaskEditor}
        />
      )}
    </>
  );
};
export default TodoBoard;
