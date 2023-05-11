import React from "react";
import * as S from "../styled/TodoList.styled";
import Icon from "./Icon";
import { useSelector } from "react-redux";

const TodoList = () => {
  const handleClick = () => {};
  const { userTodos } = useSelector((state) => state.user);

  return (
    <S.Nav>
      <S.AddListBtn onClick={handleClick}>
        <Icon iconName="plus" />
      </S.AddListBtn>
      <S.BoardList>{userTodos && userTodos.map((item) => <S.BoardItem>{item.boardName}</S.BoardItem>)}</S.BoardList>
    </S.Nav>
  );
};

export default TodoList;
