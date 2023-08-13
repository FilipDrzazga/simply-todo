import React, { useState, useEffect } from "react";
import Button from "./Button";
import * as S from "../styled/TodoSharedBoard.styled";
import { useDispatch, useSelector } from "react-redux";
import { searchUsersByUsernameDB, sharedBoardWithUsers } from "../store/userSlice";

const TodoSharedBoard = ({ setDisplayTodoSharedBoard }) => {
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (searchUser) {
      dispatch(searchUsersByUsernameDB(searchUser));
    }
  }, [searchUser, dispatch]);

  const closeTodoSharedBoard = (e) => {
    e.target.tagName === "SECTION" && setDisplayTodoSharedBoard(false);
  };

  const handleInputChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleAddUserToBoard = (user) => {
    dispatch(sharedBoardWithUsers(user));
  };

  return (
    <S.Section onClick={(e) => closeTodoSharedBoard(e)}>
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
          <S.SharedBoardSearchUser
            onChange={handleInputChange}
            value={searchUser}
            type="text"
            name="searchUser"
            id="searchUser"
            placeholder="Search user by email..."
          />
        </S.SharedBoardInputContainer>
        <S.SharedBoardUsersList>
          {user.searchUsers &&
            user.searchUsers.map((user) => (
              <S.SharedBoardUsersItem key={user.userId}>
                <S.SharedBoardUsersAvatar>
                  <S.SharedBoardUsersAvatarImg alt="avatar" src="https://i.pravatar.cc/150?img=12" />
                </S.SharedBoardUsersAvatar>
                <S.SharedBoardUsersname>{user.username}</S.SharedBoardUsersname>
                <S.SharedBoardUsersBtn onClick={() => handleAddUserToBoard(user)}>Add</S.SharedBoardUsersBtn>
              </S.SharedBoardUsersItem>
            ))}
        </S.SharedBoardUsersList>
        <Button primary="true" type="submit" size="95%">
          Sharing
        </Button>
      </S.SharedBoard>
    </S.Section>
  );
};

export default TodoSharedBoard;
