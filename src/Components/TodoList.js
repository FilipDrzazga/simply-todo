import React from "react";
import * as S from "../styled/TodoList.styled";
import Icon from "./Icon";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TodoList = () => {
  const handleClick = (e) => {
    e.preventDefault();
  };

  const { userTodos } = useSelector((state) => state.user);

  return (
    <S.Nav>
      <S.AddListBtn>
        <Icon iconName="plus" />
      </S.AddListBtn>
      <S.BoardList>
        {userTodos &&
          userTodos.map((item, id) => (
            <S.BoardItem onClick={(e) => handleClick(e)} id={id} key={item.boardId}>
              <Link to={`/todo/${item.boardId}`}>{item.boardName}</Link>
            </S.BoardItem>
          ))}
      </S.BoardList>
    </S.Nav>
  );
};

export default TodoList;
