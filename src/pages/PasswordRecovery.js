import React, { useState } from "react";
import * as S from "../styled/PasswordRecovery.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Separator from "../Components/Separator";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from "formik";
import { recoveryPasswordValidation, authMessageHandler } from "../utils";
import { auth, sendPasswordResetEmail } from "../firebase/firebase";

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
    validationSchema: recoveryPasswordValidation,
    onSubmit: onSubmit,
  });

  return (
    <S.Section>
      {isRecovered && <AuthPopup message={isRecovered} />}
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
        <S.ButtonContainer>
          <Button primary type="submit" size="90%" disabled={!isValid}>
            Sent password
          </Button>
          <Separator />
          <Button secondary size="60%" navigateTo="/create-account">
            Create account
          </Button>
          <Button secondary size="60%" navigateTo="/login">
            Login
          </Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Section>
  );
};

export default PasswordRecovery;
