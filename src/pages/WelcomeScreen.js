import React from "react";
import Button from "../Components/Button";
import Logo from "../Components/Logo";

import * as S from "../styled/WelcomeScreen.styled";

const createBtnVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 2,
      opacity: { duration: 1 },
      y: { duration: 0.75 },
    },
  },
  hover: { backgroundColor: "#306F30" },
  exit: {
    x: "-100vw",
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const loginBtnVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 2.1, opacity: { duration: 1 }, y: { duration: 0.7 } } },
  hover: { backgroundColor: "#FAFAFA", color: "#191919" },
  exit: {
    x: "-100vw",
    transition: { delay: 0.1, duration: 0.2, ease: "easeInOut" },
  },
};

const WelcomeScreen = () => {
  return (
    <S.Section>
      <S.Header>
        <Logo />
      </S.Header>
      <S.ButtonContainer>
        <Button
          variants={createBtnVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          exit="exit"
          size="90%"
          primary="true"
          navigateTo="/create-account"
        >
          Create account
        </Button>
        <Button
          variants={loginBtnVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          exit="exit"
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
