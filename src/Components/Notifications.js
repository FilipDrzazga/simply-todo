import React, { useEffect } from "react";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";

import * as S from "../styled/Notifications.styled";
import {
  deleteInvitations,
  clearNewInvitation,
  setInvitationAlert,
  updateInvitationStatus,
  queryAcceptSharedBoard,
} from "../store/userSlice";

const Notifications = ({ handleClickNotifications }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInvitationAlert(false));
    dispatch(clearNewInvitation(user.userData.userId));
  }, []);

  const handleClearInvitation = () => {
    dispatch(deleteInvitations(user.userData.userId));
  };

  const handleJoinToBoard = (data) => {
    dispatch(
      updateInvitationStatus({
        userId: user.userData.userId,
        senderUserId: data.sharedByUserId,
        boardId: data.sharedBoardId,
        status: "fulfilled",
      })
    );
    dispatch(queryAcceptSharedBoard(data.sharedBoardId));
  };

  const handleRejectBoard = (data) => {
    dispatch(
      updateInvitationStatus({
        userId: user.userData.userId,
        senderUserId: data.sharedByUserId,
        boardId: data.sharedBoardId,
        status: "rejected",
      })
    );
  };

  const switchNotificationStatus = (data) => {
    switch (data.invitationStatus) {
      case "pending":
        return (
          <S.NotificationsBtnsContainer>
            <S.NotificationsBtn onClick={() => handleJoinToBoard(data)} join={true}>
              Join{" "}
            </S.NotificationsBtn>
            <S.NotificationsBtn onClick={() => handleRejectBoard(data)} decline={true}>
              Decline
            </S.NotificationsBtn>
          </S.NotificationsBtnsContainer>
        );
      case "rejected":
        return <S.JoinedStatus>rejected access to {data.sharedBoardName} todo list</S.JoinedStatus>;
      case "fulfilled":
        return <S.JoinedStatus>joined to {data.sharedBoardName} todo list</S.JoinedStatus>;
      default:
        console.log("error from switch notification status!");
    }
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
                {switchNotificationStatus(notification)}
              </S.NotificationsItem>
            ))}
        </S.NotificationsList>
      </S.NotificationsSectionByListDate>
    </S.NotificationsSection>
  );
};

export default Notifications;
