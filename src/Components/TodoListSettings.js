import React, { useState } from "react";
import Icon from "./Icon";

import * as S from "../styled/TodoListSettings.styled";
import { useDispatch, useSelector } from "react-redux";
import TaskEditor from "./TaskEditor";
import TodoRemove from "./TodoRemove";
import TodoSharedBoard from "./TodoSharedBoard";
import { leaveAndRemoveSharedBoard, removeAllDoneTask, removeBoardFromState } from "../store/userSlice";

const TodoListSettings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
  const [displayTodoRemove, setDisplayTodoRemove] = useState(false);
  const [displayTodoSharedBoard, setDisplayTodoSharedBoard] = useState(false);
  const [displaySettingsList, setDisplaySettingsList] = useState(false);

  const isDefaultBoard = () => {
    return user.activeBoard[0] && user.activeBoard[0]?.defaultBoard;
  };

  const isSharedBoard = () => {
    return user.activeBoard[0] && user.activeBoard[0]?.isSharedBoard;
  };

  const renameBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    setDisplayTaskEditor(true);
  };

  const deleteBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    setDisplayTodoRemove(true);
  };

  const sharedBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    setDisplayTodoSharedBoard(true);
  };

  const deleteDoneTasks = () => {
    dispatch(removeAllDoneTask(user.activeBoard[0].boardId));
    setDisplaySettingsList(!displaySettingsList);
  };

  const handleOpenSettingsList = () => {
    setDisplaySettingsList(!displaySettingsList);
  };

  const leaveSharedBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    dispatch(removeBoardFromState(user.activeBoard[0].boardName));
    dispatch(
      leaveAndRemoveSharedBoard({
        userId: user.userData.userId,
        senderUserId: user.activeBoard[0].userId,
        boardName: user.activeBoard[0].boardName,
      })
    );
  };

  return (
    <>
      <S.Section>
        <S.SettingsBtn onClick={() => handleOpenSettingsList()}>
          <Icon iconName="ellipsis" iconType="fas" iconColor="default" size="lg" />
        </S.SettingsBtn>
        {displaySettingsList && (
          <S.SettingsList>
            {!isSharedBoard() ? (
              <>
                <S.Item onClick={() => renameBoard()} isDefaultBoard={isDefaultBoard()}>
                  Rename board
                </S.Item>
                <S.Item onClick={() => sharedBoard()} isDefaultBoard={isDefaultBoard()}>
                  Shared board
                </S.Item>
                <S.Item onClick={() => deleteDoneTasks()}>Delete done tasks</S.Item>
                <S.Item onClick={() => deleteBoard()} isDefaultBoard={isDefaultBoard()} isDelete={true}>
                  Delete board
                </S.Item>
              </>
            ) : (
              <S.Item onClick={() => leaveSharedBoard()} isDelete={true} leaveBoard={true}>
                Leave board
              </S.Item>
            )}
          </S.SettingsList>
        )}
      </S.Section>
      {displayTaskEditor && (
        <TaskEditor
          validateField="renameBoard"
          id="renameBoard"
          htmlFor="renameBoard"
          placeholder="Enter new board name..."
          buttonText="Rename"
          labelText="Rename board:"
          setDisplayTaskEditor={setDisplayTaskEditor}
        />
      )}
      {displayTodoRemove && <TodoRemove setDisplayTodoRemove={setDisplayTodoRemove} />}
      {displayTodoSharedBoard && <TodoSharedBoard setDisplayTodoSharedBoard={setDisplayTodoSharedBoard} />}
    </>
  );
};

export default TodoListSettings;
