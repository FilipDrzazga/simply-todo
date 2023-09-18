import styled from "styled-components";

const Section = styled.section`
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
const SharedBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 90%;
  height: 80vh;
  padding: ${({ theme }) => theme.padding[3]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 15px;
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
`;
const SharedBoardUsersItem = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 30%;
`;
const SharedBoardUsersAvatar = styled.div`
  width: 50px;
  height: 50px;
  aligns-self: flex-start;
  border-radius: 50%;
  overflow: hidden;
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
`;
const SharedBoardUsersBtn = styled.button`
  width: 70px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  color: ${({ theme }) => theme.colors.font.primary};
  border-radius: 7px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.button.secondary};
`;
const SharedBoardUserRemoveBtn = styled.button`
  width: 70px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  color: ${({ theme }) => theme.colors.font.primary};
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.button.delete};
  border: none;
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
