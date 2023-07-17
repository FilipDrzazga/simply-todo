import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 50px;
  position: sticky;
  bottom: 0px;
  left: 0px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const SettingsList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  padding-left: 20px;
  list-style-type: none;
`;
const Item = styled.li``;

const Button = styled.button`
  background-color: transparent;
  border: none;
  &:disabled {
    opacity: 0.3;
  }
`;

export { Section, SettingsList, Item, Button };
