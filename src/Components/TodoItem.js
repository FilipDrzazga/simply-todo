import React from "react";
import * as S from "../styled/TodoItem.styled";
import Icon from "./Icon";

import { useSelector } from "react-redux";

const TodoItem = () => {
  return (
    <S.TasksSection>
      <S.TaskList>
        <S.TaskItem>
          <button>
            <Icon iconName="circle" iconType="far" iconColor="checkbox" />
          </button>
          task1
        </S.TaskItem>
        <S.TaskItem>
          <button>
            <Icon iconName="circle" iconType="far" iconColor="checkbox" />
          </button>
          task4
        </S.TaskItem>
        <S.TaskItem>
          <button>
            <Icon iconName="circle" iconType="far" iconColor="checkbox" />
          </button>
          task3
        </S.TaskItem>
      </S.TaskList>
    </S.TasksSection>
  );
};

export default TodoItem;
