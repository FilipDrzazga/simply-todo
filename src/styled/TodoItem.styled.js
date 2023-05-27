import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  border-bottom: solid 0.5px ${({ theme }) => theme.colors.borderLine};
`;
const List = styled.ul`
  padding: ${({ theme }) => theme.padding[2]};
  list-style-type: none;
`;
const Item = styled.li`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin[2]};
  margin-top: ${({ theme }) => theme.margin[2]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: lighter;
  button {
    width: 10%;
    height: 100%;
    background-color: transparent;
    border: none;
  }
`;

export { Section, List, Item };
