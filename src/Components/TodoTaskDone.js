import React, { useState } from "react";
import Icon from "./Icon";

import * as S from "../styled/TodoTaskDone.styled";

const TodoTaskDone = () => {
  const [isOpen, setIsOpen] = useState(false);

  const displayDoneTask = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.TaskDoneSection>
      <S.TaskDoneDisplayBtn onClick={() => displayDoneTask()}>
        Done (3)
        <Icon iconName="caret-down" iconType="fas" size="sm" isRotate={isOpen} />
      </S.TaskDoneDisplayBtn>
      {isOpen && (
        <S.TaskDoneList>
          <S.TaskDoneItem>
            <button>
              <Icon iconName="circle" iconType="fas" iconColor="checkbox" />
            </button>
            Pies
          </S.TaskDoneItem>
        </S.TaskDoneList>
      )}
    </S.TaskDoneSection>
  );
};

export default TodoTaskDone;
