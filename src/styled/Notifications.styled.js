import styled, { css } from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

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
  cursor: pointer;
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
  cursor: pointer;
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
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const NotificationsItem = styled.li`
  width: 90%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.padding[1]};
  border-radius: 20px;
  @media ${breakpoints.tablet} {
    gap: 20px;
    justify-content: center;
  }
`;

const NotificationsAvatarContainer = styled.div`
  width: 60px;
  height: 60px;
  aligns-self: flex-start;
  border-radius: 50%;
  overflow: hidden;
  @media ${breakpoints.tablet} {
    width: 70px;
    height: 70px;
  }
`;

const NotificationContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-left: ${({ theme }) => theme.margin[1]};
  @media ${breakpoints.tablet} {
    width: 80%;
  }
`;

const NotificationsBtnsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const NotificationsDescription = styled.p`
  font-size: 0.8rem;
  text-align: center;
  @media ${breakpoints.tablet} {
    flex-grow: 0;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;

const NotificationsUsername = styled.span`
  font-style: italic;
  font-weight: bold;
`;

const NotificationsBoardName = styled.span`
  color: ${({ theme }) => theme.colors.font.accentGreen};
`;

const NotificationsAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NotificationsBtn = styled(motion.button)`
  width: 50%;
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
  @media ${breakpoints.tablet} {
    height: 40px;
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;

const JoinedStatus = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.font.accent};
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
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
  NotificationContent,
  NotificationsDescription,
  NotificationsUsername,
  NotificationsBoardName,
  NotificationsAvatarContainer,
  NotificationsAvatarImg,
  NotificationsBtnsContainer,
  NotificationsBtn,
  JoinedStatus,
};
