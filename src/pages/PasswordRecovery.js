import React, { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthPopup from "../Components/AuthPopup";

import { useFormik } from "formik";
import { recoveryPasswordValidation, authMessageHandler } from "../utils";
import { auth, sendPasswordResetEmail } from "../firebase/firebase";

import * as S from '../styled/CreateAccount.styled';
import abstractMobile from '../image/abstract-mobile.jpg'

const PasswordRecovery = () => {

    const [isRecovered, setIsRecovered] = useState(null);

    const onSubmit = ({email}, {resetForm}) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsRecovered(authMessageHandler('reset-password'));
            }).catch((error) => {
                console.log(error.code);
            }).finally(() => {
                resetForm();
            });
    };

    const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email:'',
        },
        validateOnMount: true,
        validationSchema: recoveryPasswordValidation,
        onSubmit:onSubmit,
    });

    return (
        <S.Section>
            {isRecovered && <AuthPopup message={isRecovered} />}
            <S.Header>
                <h1>Password recovery.</h1>
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
                </S.InputsContainer>
                <S.ButtonContainer>
                    <Button type='submit' size="xl" color="dark" disabled={!isValid}>Sent password</Button>
                    <div>
                        <hr />
                        <span>or continue</span>
                        <hr />
                    </div>
                    <Button size="l" color="light" navigateTo="/create-account">Create account</Button>
                    <Button size="l" color="light" navigateTo="/login">Login</Button>
                </S.ButtonContainer>
            </S.Form>
        </S.Section>
    )
};

export default PasswordRecovery;