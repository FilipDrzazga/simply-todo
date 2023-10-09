import React, { useState } from "react";
import Icon from "./Icon";
import * as S from "../styled/TodoBoard.styled";
import TaskEditor from "./TaskEditor";

import { useDispatch, useSelector } from "react-redux";
import { setActiveTodoBoard } from "../store/userSlice";

const TodoBoard = ({ variants }) => {
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
  const [selected, setSelected] = useState(0);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleActiveBoard = (e, item) => {
    setSelected(e.target.tabIndex);
    dispatch(setActiveTodoBoard({ setActiveBoard: [{ ...item }] }));
  };

  const displayBoards = () => {
    return (
      user.userTodos && (
        <S.BoardList>
          {user.userTodos.map((item, id) => (
            <S.BoardItem tabIndex={id} onClick={(e) => handleActiveBoard(e, item)} id={item.boardId} key={item.boardId}>
              {item.boardName}
              {selected === id && <S.SelectedBoardItem layoutId="underline"></S.SelectedBoardItem>}
            </S.BoardItem>
          ))}
          <S.BoardItem></S.BoardItem>
        </S.BoardList>
      )
    );
  };

  return (
    <>
      <S.BoardNav variants={variants}>
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
