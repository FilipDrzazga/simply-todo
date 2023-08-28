import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
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
`;
const Item = styled.li`
  ${({ leaveBoard }) => leaveBoard ?? "flex-grow:1"};
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
`;

const SettingsBtn = styled.button`
  width: 20%;
  height: 100%;
  background-color: transparent;
  border: none;
  &:disabled {
    opacity: 0.3;
  }
`;

export { Section, SettingsList, Item, SettingsBtn };
