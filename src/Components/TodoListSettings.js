import React, { useState } from "react";
import Icon from "./Icon";

import * as S from "../styled/TodoListSettings.styled";
import { useSelector } from "react-redux";
import TaskEditor from "./TaskEditor";
import TodoRemove from "./TodoRemove";
import TodoSharedBoard from "./TodoSharedBoard";

const TodoListSettings = () => {
  const user = useSelector((state) => state.user);
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);
  const [displayTodoRemove, setDisplayTodoRemove] = useState(false);
  const [displayTodoSharedBoard, setDisplayTodoSharedBoard] = useState(false);
  const [displaySettingsList, setDisplaySettingsList] = useState(false);

  const isDisabled = () => {
    return user.activeBoard[0] && user.activeBoard[0].defaultBoard;
  };

  const renameBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    return setDisplayTaskEditor(true);
  };

  const deleteBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    setDisplayTodoRemove(true);
  };

  const sharedBoard = () => {
    setDisplaySettingsList(!displaySettingsList);
    setDisplayTodoSharedBoard(true);
  };

  const handleOpenSettingsList = () => {
    setDisplaySettingsList(!displaySettingsList);
  };

  return (
    <>
      <S.Section>
        <S.SettingsBtn onClick={() => handleOpenSettingsList()} disabled={isDisabled()}>
          <Icon iconName="ellipsis" iconType="fas" iconColor="default" size="lg" />
        </S.SettingsBtn>
        {displaySettingsList && (
          <S.SettingsList>
            <S.Item onClick={() => renameBoard()} disabled={isDisabled()}>
              Rename board
            </S.Item>
            <S.Item onClick={() => sharedBoard()} disabled={isDisabled()}>
              Shared board
            </S.Item>
            <S.Item onClick={() => deleteBoard()} disabled={isDisabled()} isDelete={true}>
              Delete board
            </S.Item>
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
