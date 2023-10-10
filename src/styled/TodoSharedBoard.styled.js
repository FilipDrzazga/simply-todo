import styled from "styled-components";
import { breakpoints } from "./theme";
import { motion } from "framer-motion";

const Section = styled(motion.section)`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  backdrop-filter: blur(3px);
  z-index: 999;
`;
const SharedBoard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 90%;
  height: 80vh;
  padding: ${({ theme }) => theme.padding[3]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 15px;
  @media ${breakpoints.tablet} {
    width: 50%;
    height: 50vh;
  }
  @media ${breakpoints.laptop} {
    width: 28%;
    height: 70vh;
  }
`;
const SharedBoardHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
`;
const SharedBoardTitle = styled.h1`
  width: 100%;
  height: 50%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[4]};
  font-weight: lighter;
  span {
    font-weight: bold;
  }
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[5]};
  }
`;
const SharedBoardNav = styled.nav`
  width: 100%;
  height: 50%;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    list-style: none;
    li {
      font-weight: lighter;
      cursor: pointer;
    }
  }
  @media ${breakpoints.tablet} {
    li {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }
`;
const sharedBoardNavItem = styled.li`
  font-weight: lighter;
  cursor: pointer;
  color: ${({ theme, active }) => active && theme.colors.font.accentGreen};
`;
const SharedBoardInputContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${breakpoints.laptop} {
    width: 80%;
  }
`;
const SharedBoardSearchUser = styled.input`
  width: 95%;
  height: 70%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.input.border};
  outline: none;
  color: ${({ theme }) => theme.colors.input.font};
  &::placeholder {
    padding-left: ${({ theme }) => theme.padding[2]};
    color: ${({ theme }) => theme.colors.font.primary};
  }
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;

const SharedBoardUsersList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 50%;
  list-style: none;
  overflow-y: scroll;
  @media ${breakpoints.laptop} {
    overflow-y: hidden;
    margin-top: 30px;
  }
`;
const SharedBoardUsersItem = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 30%;
  @media ${breakpoints.laptop} {
    width: 70%;
  }
`;
const SharedBoardUsersAvatar = styled.div`
  width: 50px;
  height: 50px;
  aligns-self: flex-start;
  border-radius: 50%;
  overflow: hidden;
  @media ${breakpoints.tablet} {
    width: 70px;
    height: 70px;
  }
`;
const SharedBoardUsersAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const SharedBoardUsersname = styled.span`
  flex-grow: 1;
  margin-left: ${({ theme }) => theme.margin[2]};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  font-weight: lighter;
  letter-spacing: 1.8px;
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;
const SharedBoardUsersBtn = styled(motion.button)`
  width: 70px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  color: ${({ theme }) => theme.colors.font.primary};
  border-radius: 7px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.button.secondary};
  @media ${breakpoints.tablet} {
    width: 90px;
    height: 40px;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;
const SharedBoardUserRemoveBtn = styled(motion.button)`
  width: 70px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  color: ${({ theme }) => theme.colors.font.primary};
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.button.delete};
  border: none;
  @media ${breakpoints.tablet} {
    width: 90px;
    height: 40px;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;

export {
  Section,
  SharedBoard,
  SharedBoardHeader,
  SharedBoardTitle,
  SharedBoardNav,
  sharedBoardNavItem,
  SharedBoardInputContainer,
  SharedBoardSearchUser,
  SharedBoardUsersList,
  SharedBoardUsersItem,
  SharedBoardUsersAvatar,
  SharedBoardUsersAvatarImg,
  SharedBoardUsersname,
  SharedBoardUsersBtn,
  SharedBoardUserRemoveBtn,
};
