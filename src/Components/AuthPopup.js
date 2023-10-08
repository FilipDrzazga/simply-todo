import React from "react";
import Icon from "./Icon";

import * as S from "../styled/AuthPopup.styled";

const popupVariants = {
  hidePopup: { top: "-7%", left: "50%" },
  showPopup: { top: "7%", left: "50%", transition: { type: "spring", stiffness: 110 } },
  exit: { top: "-7%", left: "50%", transition: { ease: "easeOut" } },
};

const AuthPopup = ({ message }) => {
  return (
    <S.Section layout key="modal" variants={popupVariants} initial="hidePopup" animate="showPopup" exit="exit">
      <S.Header>
        <p>{message.message}</p>
        <p>{message.messageDescripction}</p>
      </S.Header>
      <Icon iconName={message.icon} iconColor={message.iconColor} />
    </S.Section>
  );
};

export default AuthPopup;
