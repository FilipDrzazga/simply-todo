import React, { useState } from "react";
import * as S from "../styled/Login.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Separator from "../Components/Separator";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { emailAccountValidation, authMessageHandler } from "../utils/index";
import { auth, signInWithEmailAndPassword } from "../firebase/firebase";

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
const BtnContainerVariants = {
  initial: { y: "100vh", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { opacity: { duration: 0.7 }, y: { duration: 0.2 } } },
  exit: { y: "100vh", opacity: 0 },
};

const CreateAccount = () => {
  const [popupMsg, setPopupMsg] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }, { resetForm }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        navigate("/todo");
      }
    } catch (error) {
      setPopupMsg(authMessageHandler(error.code));
    } finally {
      resetForm();
    }
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema: emailAccountValidation,
    onSubmit: onSubmit,
  });

  return (
    <S.Section>
      {popupMsg && <AuthPopup message={popupMsg} />}
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
        <Input
          variants={inputsVariants}
          id="password"
          type="password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password..."
          htmlFor="password"
          labelText="Password"
          size="90%"
          forgotPassword
        />
        <S.ButtonContainer variants={BtnContainerVariants}>
          <Button primary="true" type="submit" size="90%" disabled={!isValid}>
            Login
          </Button>
          <Separator />
          <Button type="button" secondary="true" size="60%" navigateTo="/create-account">
            Create account
          </Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Section>
  );
};

export default CreateAccount;
