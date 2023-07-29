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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 90%;
  padding: ${({ theme }) => theme.padding[3]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 15px;
  text-align: center;
`;
const Text = styled.p`
  line-height: 1.3rem;
  font-weight: lighter;
`;

export { Section, Container, Text };
