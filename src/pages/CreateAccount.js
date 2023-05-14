import React, { useState } from "react";
import * as S from "../styled/CreateAccount.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Separator from "../Components/Separator";
import AuthPopup from "../Components/AuthPopup";

import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createAccountValidation, authMessageHandler } from "../utils/index";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase";
import { createBoardForNewUser, createUserDataInDB } from "../store/userSlice";

const CreateAccount = () => {
  const [popupMsg, setPopupMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password, username }, { resetForm }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const data = {
        username,
        email,
        userId: user.uid,
      };
      dispatch(createUserDataInDB(data));
      dispatch(createBoardForNewUser(user.uid));
      navigate("/todo");
    } catch (error) {
      setPopupMsg(authMessageHandler(error.code));
    } finally {
      resetForm();
    }
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema: createAccountValidation,
    onSubmit: onSubmit,
  });

  return (
    <S.Section>
      {popupMsg && <AuthPopup message={popupMsg} />}
      <S.Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          id="username"
          type="text"
          value={values.username}
          error={errors.username}
          touched={touched.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Username..."
          htmlFor="username"
          labelText="Username"
          size="90%"
        />
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
        />
        <S.ButtonContainer>
          <Button primary="true" type="submit" size="90%" disabled={!isValid}>
            Create account
          </Button>
          <Separator />
          <Button secondary="true" size="60%" navigateTo="/login">
            Login
          </Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Section>
  );
};

export default CreateAccount;
