import React from "react";
import * as S from "../styled/Icon.style";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(far, fas);

const Icon = ({ iconName, iconType, iconColor = "default", size }) => {
  return (
    <S.Container iconColor={iconColor}>
      <FontAwesomeIcon size={size} icon={[iconType, iconName]} />
    </S.Container>
  );
};

export default Icon;
