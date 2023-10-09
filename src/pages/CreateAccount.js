import React, { useState, useEffect } from "react";
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
import { createBoardForNewUser, createUserDataInDB, isUsernameExist } from "../store/userSlice";
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
  hoverCreateBtn: { backgroundColor: "#306F30" },
  hoverLoginBtn: { backgroundColor: "#FAFAFA", color: "#191919" },
};

const CreateAccount = () => {
  const [popupMsg, setPopupMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setPopupMsg(null);
    }, 3000);
  }, [popupMsg]);

  const onSubmit = async ({ email, password, username }, { resetForm }) => {
    try {
      const isExist = await dispatch(isUsernameExist(username));

      if (!isExist.payload.length) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const data = {
          username,
          email,
          userId: user.uid,
        };
        await dispatch(createUserDataInDB(data));
        await dispatch(createBoardForNewUser(user.uid));
        if (auth.currentUser) {
          navigate("/todo");
        }
      } else {
        throw new Error("Username-exist");
      }
    } catch (error) {
      setPopupMsg(authMessageHandler(error.code || error.message));
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
      <AnimatePresence>{popupMsg && <AuthPopup message={popupMsg} />}</AnimatePresence>
      <S.Form
        layout="true"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Input
          variants={inputsVariants}
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
        />
        <S.ButtonContainer variants={btnContainerVariants}>
          <Button
            variants={btnContainerVariants}
            whileHover="hoverCreateBtn"
            primary="true"
            type="submit"
            size="90%"
            disabled={!isValid}
          >
            Create account
          </Button>
          <Separator />
          <Button
            variants={btnContainerVariants}
            whileHover="hoverLoginBtn"
            type="button"
            secondary="true"
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

export default CreateAccount;
