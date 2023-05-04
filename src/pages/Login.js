import React, { useState } from "react";
import * as S from "../styled/Login.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Separator from "../Components/Separator";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from "formik";
import { passwordEmailValidation, authMessageHandler } from "../utils/index";
import { auth, signInWithEmailAndPassword } from "../firebase/firebase";

const CreateAccount = () => {
  const [popupMsg, setPopupMsg] = useState(null);

  const onSubmit = ({ email, password }, { resetForm }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setPopupMsg(authMessageHandler("login"));
      })
      .catch((error) => {
        setPopupMsg(authMessageHandler(error.code));
      })
      .finally(() => {
        resetForm();
      });
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema: passwordEmailValidation,
    onSubmit: onSubmit,
  });

  return (
    <S.Section>
      {popupMsg && <AuthPopup message={popupMsg} />}
      <S.Form onSubmit={handleSubmit} autoComplete="off">
        <Input
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
          id="password"
          type="text"
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
        <S.ButtonContainer>
          <Button primary type="submit" size="90%" disabled={!isValid}>
            Login
          </Button>
          <Separator />
          <Button secondary size="60%" navigateTo="/create-account">
            Create account
          </Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Section>
  );
};

export default CreateAccount;
