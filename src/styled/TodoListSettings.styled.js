import styled, { css } from "styled-components";
import { breakpoints } from "./theme";

const Section = styled.section`
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  @media ${breakpoints.tablet} {
    height: 70px;
  }
`;

const SettingsList = styled.ul`
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 140px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 5px 5px 0 0;
  list-style-type: none;
  @media ${breakpoints.tablet} {
    bottom: 70px;
    width: 180px;
  }
`;
const Item = styled.li`
  ${({ leaveBoard }) => leaveBoard ?? "flex-grow:1"};
  ${({ isSharedBoard }) => isSharedBoard ?? "flex-grow:0"};
  width: 100%;
  height: 40%;
  display: flext;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  text-align: center;
  color: ${({ theme, isDelete }) => (isDelete ? theme.colors.button.delete : theme.colors.font.primary)};
  letter-spacing: 1px;
  font-weight: 300;
  ${({ isDefaultBoard }) =>
    isDefaultBoard &&
    css`
      display: none;
    `}
  @media ${breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;

const SettingsBtn = styled.button`
  width: 20%;
  height: 100%;
  background-color: transparent;
  border: none;
  &:disabled {
    opacity: 0.3;
  }
  @media ${breakpoints.tablet} {
    text-align: left;
    padding-left: ${({ theme }) => theme.padding[5]};
  }
`;

export { Section, SettingsList, Item, SettingsBtn };
