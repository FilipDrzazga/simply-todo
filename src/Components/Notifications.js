import React, { useEffect } from "react";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";

import * as S from "../styled/Notifications.styled";
import { clearInvitation, clearNewInvitation, setInvitationAlert } from "../store/userSlice";

const Notifications = ({ handleClickNotifications }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInvitationAlert(false));
    dispatch(clearNewInvitation(user.userData.userId));
  }, []);

  const handleClearInvitation = () => {
    dispatch(clearInvitation(user.userData.userId));
  };

  return (
    <S.NotificationsSection>
      <S.NotificationsHeader>
        <S.NotificationsCloseBtn onClick={() => handleClickNotifications()}>
          <Icon iconName="arrow-left" iconType="fas" size="lg" />
        </S.NotificationsCloseBtn>
        <S.NotificationsTitle>Notifications</S.NotificationsTitle>
        <S.NotificationsClearBtn onClick={() => handleClearInvitation()}>Clear</S.NotificationsClearBtn>
      </S.NotificationsHeader>
      <S.NotificationsSectionByListDate>
        <S.NotificationsList>
          {user.sharedBoardsBy &&
            user.sharedBoardsBy.map((notification) => (
              <S.NotificationsItem key={notification.sharedBoardId}>
                <S.NotificationsAvatarContainer>
                  <S.NotificationsAvatarImg alt="avatar" src="https://i.pravatar.cc/150?img=12" />
                </S.NotificationsAvatarContainer>
                <S.NotificationsDescription>
                  <S.NotificationsUsername>{notification.sharedByUsername}</S.NotificationsUsername> invites you to{" "}
                  <S.NotificationsBoardName>{notification.sharedBoardName}</S.NotificationsBoardName> todo list
                </S.NotificationsDescription>
                {notification.isInvitationFulfilled === "pending" && (
                  <S.NotificationsBtnsContainer>
                    <S.NotificationsBtn join={true}>Join </S.NotificationsBtn>
                    <S.NotificationsBtn decline={true}>Decline</S.NotificationsBtn>
                  </S.NotificationsBtnsContainer>
                )}
                {notification.isInvitationFulfilled === true && (
                  <S.JoinedStatus>joined to {notification.sharedBoardName} todo list</S.JoinedStatus>
                )}
                {!notification.isInvitationFulfilled && (
                  <S.JoinedStatus>rejected access to {notification.sharedBoardName} todo list</S.JoinedStatus>
                )}
              </S.NotificationsItem>
            ))}
        </S.NotificationsList>
      </S.NotificationsSectionByListDate>
    </S.NotificationsSection>
  );
};

export default Notifications;
