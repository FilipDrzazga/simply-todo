import React from "react";
import Button from "./Button";
import * as S from "../styled/TodoSharedBoard.styled";

const TodoSharedBoard = ({ setDisplayTodoSharedBoard }) => {
  const closeTodoSharedBoard = () => {
    setDisplayTodoSharedBoard(false);
  };

  return (
    <S.Section onClick={() => closeTodoSharedBoard()}>
      <S.SharedBoard>
        <S.SharedBoardHeader>
          <S.SharedBoardTitle>
            <span>Shared</span> board
          </S.SharedBoardTitle>
          <S.SharedBoardNav>
            <ul>
              <li>Users</li>
              <span>|</span>
              <li>Shared</li>
            </ul>
          </S.SharedBoardNav>
        </S.SharedBoardHeader>
        <S.SharedBoardInputContainer>
          <S.SharedBoardSearchUser placeholder="Search user by email..." />
        </S.SharedBoardInputContainer>
        <S.SharedBoardUsersList>
          <S.SharedBoardUsersItem>
            <S.SharedBoardUsersAvatar>
              <S.SharedBoardUsersAvatarImg alt="avatar" src="https://i.pravatar.cc/150?img=12" />
            </S.SharedBoardUsersAvatar>
            <S.SharedBoardUsersEmail>filip.drzazga@gmail.com</S.SharedBoardUsersEmail>
            <S.SharedBoardUsersBtn>Add</S.SharedBoardUsersBtn>
          </S.SharedBoardUsersItem>
        </S.SharedBoardUsersList>
        <Button primary={true} type="submit" size="95%">
          Sharing
        </Button>
      </S.SharedBoard>
    </S.Section>
  );
};

export default TodoSharedBoard;
