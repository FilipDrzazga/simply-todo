import React, { useState } from "react";
import * as S from "../styled/CreateAccount.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Separator from "../Components/Separator";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { queryUserData } from "../store/userSlice";
import { passwordEmailValidation, authMessageHandler } from "../utils/index";
import { db, addDoc, auth, collection, createUserWithEmailAndPassword } from "../firebase/firebase";

const CreateAccount = () => {
  const [popupMsg, setPopupMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password, username }, { resetForm }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const docRef = await addDoc(collection(db, "users"), {
        username,
        email,
        userId: userCredential.user.uid,
      });
      await dispatch(queryUserData(docRef.id));
      navigate("/todo", { state: { isNewUser: true } });
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
    validationSchema: passwordEmailValidation,
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
