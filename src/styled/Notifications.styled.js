import styled, { css } from "styled-components";

const NotificationsSection = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.padding[3]};
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const NotificationsHeader = styled.header`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationsCloseBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.font.primary};
`;

const NotificationsTitle = styled.h1`
  font-weight: 300;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
`;

const NotificationsClearBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.font.primary};
  font-weight: lighter;
  letter-spacing: 1px;
`;

const NotificationsSectionByListDate = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationsDate = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.font.accent};
`;

const NotificationsList = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NotificationsItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const NotificationsDescription = styled.p`
  font-size: 0.8rem;
  flex-grow: 1;
  margin-left: ${({ theme }) => theme.margin[0]};
`;

const NotificationsUsername = styled.span`
  font-style: italic;
  font-weight: bold;
`;

const NotificationsBoardName = styled.span`
  color: ${({ theme }) => theme.colors.font.accentGreen};
`;

const NotificationsAvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  aligns-self: flex-start;
  border-radius: 50%;
  overflow: hidden;
`;

const NotificationsAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NotificationsBtnsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const NotificationsBtn = styled.button`
  width: 30%;
  height: 30px;
  border-radius: 10px;
  ${({ join, theme }) =>
    join &&
    css`
      border: none;
      background-color: ${theme.colors.button.primary};
      letter-spacing: 0.5px;
      color: ${theme.colors.font.primary};
    `};
  ${({ decline, theme }) =>
    decline &&
    css`
      border: none;
      background-color: ${theme.colors.button.delete};
      letter-spacing: 0.5px;
      color: ${theme.colors.font.primary};
    `};
`;

const JoinedStatus = styled.span`
  margin-left: 56px;
  margin-top: -13px;
  font-size: 0.8rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.font.accent};
`;

export {
  NotificationsSection,
  NotificationsHeader,
  NotificationsCloseBtn,
  NotificationsTitle,
  NotificationsClearBtn,
  NotificationsSectionByListDate,
  NotificationsDate,
  NotificationsList,
  NotificationsItem,
  NotificationsDescription,
  NotificationsUsername,
  NotificationsBoardName,
  NotificationsAvatarContainer,
  NotificationsAvatarImg,
  NotificationsBtnsContainer,
  NotificationsBtn,
  JoinedStatus,
};
