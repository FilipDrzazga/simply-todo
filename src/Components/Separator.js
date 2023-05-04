import React from "react";
import * as S from "../styled/Separator.styled";

const Separator = () => {
  return (
    <S.SeparatorContainer>
      <S.Line />
      <S.Span>or continue</S.Span>
      <S.Line />
    </S.SeparatorContainer>
  );
};

export default Separator;
