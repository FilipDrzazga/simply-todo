import React, { useState } from "react";
import * as S from "../styled/TodoList.styled";
import Icon from "./Icon";
import TaskEditor from "./TaskEditor";

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
        <S.List>
          {userTodos &&
            userTodos.map((item, id) => (
              <S.Item id={id} key={item.boardId}>
                <Link to={`/todo/${item.boardId}`}>{item.boardName}</Link>
              </S.Item>
            ))}
        </S.List>
      </S.Nav>
      {isOpen && (
        <TaskEditor
          id="addBoard"
          htmlFor="addBoard"
          buttonText="Add"
          labelText="New board"
          placeholder="New board..."
          isOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default TodoList;
