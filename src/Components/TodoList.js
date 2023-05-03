import React from "react";
import * as S from '../styled/TodoList.styled';
import Icon from "./Icon";

const TodoList = () => {

    const handleClick = () => {

    }

    return (
        <S.Nav>
            <S.AddListBtn onClick={handleClick}><Icon iconName='plus' /></S.AddListBtn>
            <S.BoardList>
                {/* {user.userData.todo.map(item => <S.BoardItem>{item.board}</S.BoardItem>)} */}
            </S.BoardList>
        </S.Nav>
    )
};

export default TodoList;