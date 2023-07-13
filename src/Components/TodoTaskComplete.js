import React from "react";
import Icon from "./Icon";

import * as S from "../styled/TodoTaskComplete.styled";

const TodoTaskComplete = () => {
  return (
    <S.TaskCompleteSection>
      <S.TaskCompleteHeader>
        <span>Done(3)</span>
        <button>
          <Icon iconName="caret-down" iconType="fas" size="sm" />
        </button>
      </S.TaskCompleteHeader>
      <S.TaskCompleteList>
        <S.TaskCompleteItem>
          <button>
            <Icon iconName="circle" iconType="fas" iconColor="checkbox" />
          </button>
          Pies
        </S.TaskCompleteItem>
      </S.TaskCompleteList>
    </S.TaskCompleteSection>
  );
};

export default TodoTaskComplete;
