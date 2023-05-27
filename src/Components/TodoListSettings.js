import React from "react";
import Icon from "./Icon";

import * as S from "../styled/TodoListSettings.styled";

const TodoListSettings = () => {
  return (
    <S.Section>
      <S.SettingsList>
        <S.Item>
          <S.Button>
            <Icon iconName="pen-to-square" iconType="fas" iconColor="default" size="lg" />
          </S.Button>
        </S.Item>
        <S.Item>
          <S.Button>
            <Icon iconName="user-group" iconType="fas" iconColor="default" size="lg" />
          </S.Button>
        </S.Item>
        <S.Item>
          <S.Button>
            <Icon iconName="trash-can" iconType="far" iconColor="delete" size="lg" />
          </S.Button>
        </S.Item>
      </S.SettingsList>
    </S.Section>
  );
};

export default TodoListSettings;
