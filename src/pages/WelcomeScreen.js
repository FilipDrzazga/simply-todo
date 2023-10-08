import React from "react";
import Button from "../Components/Button";
import Logo from "../Components/Logo";

import * as S from "../styled/WelcomeScreen.styled";

const containerBtnVariants = {
  initial: { y: "100vh", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 2, opacity: { duration: 0.7 }, y: { duration: 0.2 } } },
  hoverCreateBtn: { backgroundColor: "#306F30" },
  hoverLoginBtn: { backgroundColor: "#FAFAFA", color: "#191919" },
  exit: { y: "100vh", opacity: 0 },
};

const WelcomeScreen = () => {
  return (
    <S.Section>
      <S.Header>
        <Logo />
      </S.Header>
      <S.ButtonContainer variants={containerBtnVariants} initial="initial" animate="animate" exit="exit">
        <Button
          variants={containerBtnVariants}
          whileHover="hoverCreateBtn"
          size="90%"
          primary="true"
          navigateTo="/create-account"
        >
          Create account
        </Button>
        <Button
          variants={containerBtnVariants}
          whileHover="hoverLoginBtn"
          size="90%"
          secondary="true"
          navigateTo="/login"
        >
          Login
        </Button>
      </S.ButtonContainer>
    </S.Section>
  );
};

export default WelcomeScreen;
