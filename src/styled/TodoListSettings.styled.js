import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
`;

export { Section, SettingsList, Item, Button };
