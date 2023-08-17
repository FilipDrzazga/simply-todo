import React from "react";
import Icon from "./Icon";

import * as S from "../styled/Notifications.styled";

const Notifications = ({ handleClickNotifications }) => {
  return (
    <S.NotificationsSection>
      <S.NotificationsHeader>
        <S.NotificationsCloseBtn onClick={() => handleClickNotifications()}>
          <Icon iconName="arrow-left" iconType="fas" size="lg" />
        </S.NotificationsCloseBtn>
        <S.NotificationsTitle>Notifications</S.NotificationsTitle>
        <S.NotificationsClearBtn>Clear</S.NotificationsClearBtn>
      </S.NotificationsHeader>
      <S.NotificationsSectionByListDate>
        <S.NotificationsDate>Today</S.NotificationsDate>
        <S.NotificationsList>
          <S.NotificationsItem>
            <S.NotificationsAvatarContainer>
              <S.NotificationsAvatarImg alt="avatar" src="https://i.pravatar.cc/150?img=12" />
            </S.NotificationsAvatarContainer>
            <S.NotificationsDescription>
              <S.NotificationsUsername>Filip</S.NotificationsUsername> invites you to{" "}
              <S.NotificationsBoardName>Shoping</S.NotificationsBoardName> todo list
            </S.NotificationsDescription>
            <S.NotificationsBtnsContainer>
              <S.NotificationsBtn join={true}>Join </S.NotificationsBtn>
              <S.NotificationsBtn decline={true}>Decline</S.NotificationsBtn>
            </S.NotificationsBtnsContainer>
          </S.NotificationsItem>
        </S.NotificationsList>
      </S.NotificationsSectionByListDate>
    </S.NotificationsSection>
  );
};

export default Notifications;
