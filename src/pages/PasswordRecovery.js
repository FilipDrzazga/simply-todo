import React, { useState } from "react";
import * as S from "../styled/PasswordRecovery.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Separator from "../Components/Separator";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from "formik";
import { emailAccountValidation, authMessageHandler } from "../utils";
import { auth, sendPasswordResetEmail } from "../firebase/firebase";
import { AnimatePresence } from "framer-motion";

const containerVariants = {
  initial: { x: 0, opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.2, opacity: { duration: 1 } } },
};
const inputsVariants = {
  initial: { x: "100vw", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { opacity: { duration: 0.7 }, x: { duration: 0.5 } } },
  exit: { x: "-100vw", opacity: 0 },
};
const btnContainerVariants = {
  initial: { y: "100vh", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { opacity: { duration: 0.7 }, y: { duration: 0.2 } } },
  exit: { y: "100vh", opacity: 0 },
  whileTapSentBtn: { backgroundColor: "#306F30", scale: 0.9 },
  whileTapAccountBtn: { backgroundColor: "#FAFAFA", color: "#191919", scale: 0.9 },
  hoverSentBtn: { backgroundColor: "#306F30" },
  hoverAccountBtn: { backgroundColor: "#FAFAFA", color: "#191919" },
};

const PasswordRecovery = () => {
  const [isRecovered, setIsRecovered] = useState(null);

  const onSubmit = ({ email }, { resetForm }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsRecovered(authMessageHandler("reset-password"));
      })
      .catch((error) => {
        console.log(error.code);
      })
      .finally(() => {
        resetForm();
      });
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validateOnMount: true,
    validationSchema: emailAccountValidation,
    onSubmit: onSubmit,
  });

  return (
    <S.Section>
      <AnimatePresence>{isRecovered && <AuthPopup message={isRecovered} />}</AnimatePresence>
      <S.Form
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Input
          variants={inputsVariants}
          id="email"
          type="text"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your Email..."
          htmlFor="email"
          labelText="Email"
          size="90%"
        />
        <S.ButtonContainer variants={btnContainerVariants}>
          <Button
            variants={btnContainerVariants}
            whileTap="whileTapSentBtn"
            whileHover="hoverSentBtn"
            primary
            type="submit"
            size="90%"
            disabled={!isValid}
          >
            Sent password
          </Button>
          <Separator />
          <Button
            variants={btnContainerVariants}
            whileTap="whileTapAccountBtn"
            whileHover="hoverAccountBtn"
            secondary
            size="60%"
            navigateTo="/create-account"
          >
            Create account
          </Button>
          <Button
            variants={btnContainerVariants}
            whileTap="whileTapAccountBtn"
            whileHover="hoverAccountBtn"
            secondary
            size="60%"
            navigateTo="/login"
          >
            Login
          </Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Section>
  );
};

export default PasswordRecovery;
