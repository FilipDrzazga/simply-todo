import React, { useState } from "react";
import * as S from "../styled/CreateAccount.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from 'formik';
import { passwordEmailValidation, authMessageHandler } from '../utils/index';
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase";

import abstractMobile from '../image/abstract-mobile.jpg';

const CreateAccount = () => {

  const [popupMsg, setPopupMsg] = useState(null);

  const onSubmit = ({ email, password }, {resetForm}) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setPopupMsg(authMessageHandler('create-account'));
      }).catch((error) => {
        setPopupMsg(authMessageHandler(error.code));
      }).finally(() => {
        resetForm();
      });
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validateOnMount: true,
    validationSchema: passwordEmailValidation,
    onSubmit: onSubmit,
  });

  return (
    <S.Section>
      {popupMsg && <AuthPopup message={popupMsg} />}
      <S.Header>
        <h1>Create an account.</h1>
        <h2>Let's make things happen.</h2>
      </S.Header>
      <figure>
        <img src={abstractMobile} alt="abstract" />
      </figure>
      <S.Form onSubmit={handleSubmit} autoComplete="off">
        <S.InputsContainer>
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
          />
        </S.InputsContainer>
        <S.ButtonContainer>
          <Button type='submit' size="xl" color="dark" disabled={!isValid}>Create account</Button>
          <div>
            <hr />
            <span>or continue</span>
            <hr />
          </div>
          <Button size="l" color="light" navigateTo="/login">Login</Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Section>
  );
};

export default CreateAccount;