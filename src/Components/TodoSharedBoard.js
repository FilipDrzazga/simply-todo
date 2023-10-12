import React, { useState, useEffect } from "react";
import * as S from "../styled/TodoSharedBoard.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  filterUsersFromDB,
  removeUserFromSharedBoard,
  searchUsersByUsernameDB,
  sharedBoardWithUsers,
} from "../store/userSlice";

const containerVariants = {
  hidden: { backdropFilter: "blur(0px)" },
  visible: {
    backdropFilter: "blur(3px)",
    transition: { backdropFilter: { duration: 0.2 }, delayChildren: 0.25 },
  },
  exit: { backdropFilter: "blur(0px)", transition: { backdropFilter: { delay: 0.3, duration: 0.25 } } },
};

const childrenVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50, transition: { delay: 0.2 } },
};

const btnVariants = {
  removeBtnTap: { scale: 0.9, backgroundColor: "#8A2016" },
  removeBtnHover: { backgroundColor: "#8A2016" },
  addBtnTap: { scale: 0.9, backgroundColor: "#306F30" },
  addBtnHover: { backgroundColor: "#306F30", borderColor: "#306F30" },
};

const TodoSharedBoard = ({ setDisplayTodoSharedBoard }) => {
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState(true);
  const [sharedUsersList, setSharedUsersList] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    if (searchUser) {
      dispatch(searchUsersByUsernameDB(searchUser));
    } else if (searchUser === "") {
      dispatch(filterUsersFromDB(false));
    }
  }, [searchUser, dispatch]);

  const closeTodoSharedBoard = (e) => {
    e.target.tagName === "SECTION" && setDisplayTodoSharedBoard(false);
  };

  const handleInputChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleAddUserToBoard = (user) => {
    const isUserDuplicate = state.sharedBoards
      .filter((board) => board.sharedBoardId === state.activeBoard[0].boardId)
      .some((duplicateUser) => duplicateUser.sharedWith === user.username);
    if (!isUserDuplicate) {
      dispatch(sharedBoardWithUsers(user));
    }
  };

  const handleRemoveUserFromBoard = (sharedWithUser) => {
    dispatch(removeUserFromSharedBoard(sharedWithUser));
  };

  const handleTabActive = (e) => {
    if (e.target.textContent === "Users") {
      setUsers(true);
      setSharedUsersList(false);
    } else {
      setUsers(false);
      setSharedUsersList(true);
    }
  };

  return (
    <S.Section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => closeTodoSharedBoard(e)}
    >
      <S.SharedBoard variants={childrenVariants}>
        <S.SharedBoardHeader>
          <S.SharedBoardTitle>
            <span>Shared</span> board
          </S.SharedBoardTitle>
          <S.SharedBoardNav>
            <ul>
              <S.sharedBoardNavItem active={users} onClick={(e) => handleTabActive(e)}>
                Users
              </S.sharedBoardNavItem>
              <span>|</span>
              <S.sharedBoardNavItem active={sharedUsersList} onClick={(e) => handleTabActive(e)}>
                Shared
              </S.sharedBoardNavItem>
            </ul>
          </S.SharedBoardNav>
        </S.SharedBoardHeader>
        {users && (
          <>
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
              {state.searchUsers &&
                state.searchUsers.map((user) => (
                  <S.SharedBoardUsersItem key={user.userId}>
                    <S.SharedBoardUsersAvatar>
                      <S.SharedBoardUsersAvatarImg alt="avatar" src="https://i.pravatar.cc/150?img=12" />
                    </S.SharedBoardUsersAvatar>
                    <S.SharedBoardUsersname>{user.username}</S.SharedBoardUsersname>
                    <S.SharedBoardUsersBtn
                      variants={btnVariants}
                      whileTap="addBtnTap"
                      whileHover="addBtnHover"
                      onClick={() => handleAddUserToBoard(user)}
                    >
                      Add
                    </S.SharedBoardUsersBtn>
                  </S.SharedBoardUsersItem>
                ))}
            </S.SharedBoardUsersList>
          </>
        )}
        {sharedUsersList && (
          <S.SharedBoardUsersList>
            {state.sharedBoards &&
              state.sharedBoards.map(
                (sharedWithUser) =>
                  sharedWithUser.sharedBoardId === state.activeBoard[0].boardId && (
                    <S.SharedBoardUsersItem key={sharedWithUser.sharedWithUserId}>
                      <S.SharedBoardUsersAvatar>
                        <S.SharedBoardUsersAvatarImg alt="avatar" src="https://i.pravatar.cc/150?img=12" />
                      </S.SharedBoardUsersAvatar>
                      <S.SharedBoardUsersname>{sharedWithUser.sharedWith}</S.SharedBoardUsersname>
                      <S.SharedBoardUserRemoveBtn
                        variants={btnVariants}
                        whileTap="removeBtnTap"
                        whileHover="removeBtnHover"
                        onClick={() => handleRemoveUserFromBoard(sharedWithUser)}
                      >
                        Delete
                      </S.SharedBoardUserRemoveBtn>
                    </S.SharedBoardUsersItem>
                  )
              )}
          </S.SharedBoardUsersList>
        )}
      </S.SharedBoard>
    </S.Section>
  );
};

export default TodoSharedBoard;
