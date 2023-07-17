import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 50px;
  position: sticky;
  top: 100vh;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  // margin: auto;
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
