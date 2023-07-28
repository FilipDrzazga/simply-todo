import React from "react";
import * as S from "../styled/TodoRemove.styled";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { removeBoardFromDB } from "../store/userSlice";

const TodoRemove = ({ setDisplayTodoRemove }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const closeTodoRemove = () => {
    setDisplayTodoRemove(false);
  };

  const removeBoard = () => {
    dispatch(removeBoardFromDB(user.activeBoard[0].boardName));
  };

  return (
    <S.Section onClick={() => closeTodoRemove()}>
      <S.Container>
        <S.Text>
          Do you want to delete "{user.activeBoard[0].boardName}" Board? Will also be deleted from the users you share
          it with.
        </S.Text>
        <Button removeOnClick={() => removeBoard()} type="submit" size="70%" removebtn="true">
          DELETE
        </Button>
      </S.Container>
    </S.Section>
  );
};

export default TodoRemove;
