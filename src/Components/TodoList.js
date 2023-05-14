import React from "react";
import * as S from "../styled/TodoList.styled";
import Icon from "./Icon";

import { useSelector } from "react-redux";

const TodoList = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.dir(e.target.id);
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
              {item.boardName}
            </S.BoardItem>
          ))}
      </S.BoardList>
    </S.Nav>
  );
};

export default TodoList;
