import React, { useState } from "react";
import * as S from "../styled/TodoList.styled";
import Icon from "./Icon";
import AddRename from "./AddRename";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TodoList = () => {
  const { userTodos } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const addNewTodoList = (e) => {
    e.target && setIsOpen(true);
  };

  return (
    <>
      <S.Nav>
        <S.AddListBtn onClick={(e) => addNewTodoList(e)}>
          <Icon iconName="plus" />
        </S.AddListBtn>
        <S.BoardList>
          {userTodos &&
            userTodos.map((item, id) => (
              <S.BoardItem id={id} key={item.boardId}>
                <Link to={`/todo/${item.boardId}`}>{item.boardName}</Link>
              </S.BoardItem>
            ))}
        </S.BoardList>
      </S.Nav>
      {isOpen && (
        <AddRename
          id="addBoard"
          htmlFor="addBoard"
          buttonText="Add"
          labelText="New board"
          placeholder="New board..."
          closeModal={setIsOpen}
        />
      )}
    </>
  );
};

export default TodoList;
