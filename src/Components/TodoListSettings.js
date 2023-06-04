import React, { useState } from "react";
import Icon from "./Icon";

import * as S from "../styled/TodoListSettings.styled";
import { useSelector } from "react-redux";
import TaskEditor from "./TaskEditor";

const TodoListSettings = () => {
  const user = useSelector((state) => state.user);
  const [displayTaskEditor, setDisplayTaskEditor] = useState(false);

  const isDisabled = () => {
    return user.activeBoard && user.activeBoard[0].defaultBoard;
  };

  const renameBoard = () => {
    return setDisplayTaskEditor(true);
  };

  return (
    <>
      <S.Section>
        <S.SettingsList>
          <S.Item>
            <S.Button onClick={() => renameBoard()} disabled={isDisabled()}>
              <Icon iconName="pen-to-square" iconType="fas" iconColor="default" size="lg" />
            </S.Button>
          </S.Item>
          <S.Item>
            <S.Button disabled={isDisabled()}>
              <Icon iconName="user-group" iconType="fas" iconColor="default" size="lg" />
            </S.Button>
          </S.Item>
          <S.Item>
            <S.Button disabled={isDisabled()}>
              <Icon iconName="trash-can" iconType="far" iconColor="delete" size="lg" />
            </S.Button>
          </S.Item>
        </S.SettingsList>
      </S.Section>
      {displayTaskEditor && (
        <TaskEditor
          validateField="renameBoard"
          id="renameBoard"
          htmlFor="renameBoard"
          placeholder="Enter new name..."
          buttonText="Rename"
          labelText="Rename board:"
          setDisplayTaskEditor={setDisplayTaskEditor}
        />
      )}
    </>
  );
};

export default TodoListSettings;
