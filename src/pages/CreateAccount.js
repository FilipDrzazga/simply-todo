import React from "react";
import * as S from "../styled/CreateAccount.styled";
import Button from "../Components/Button";
import Input from "../Components/Input";

import abstractMobile from '../Image/abstract-mobile.jpg';

const CreateAccount = () => {
    return (
        <S.Section>
            <header>
                <h1>Create an account.</h1>
                <h2>Let's make things happen.</h2>
            </header>
            <figure>
                <img src={abstractMobile} alt='abstract' />
            </figure>
                <S.Form>
                    <S.InputsContainer>
                        <Input id='email' type='text' placeholder='Enter your Email...' htmlFor='email' labelText='Email' />
                        <Input id='password' type='text' placeholder='Enter your password...' htmlFor='password' labelText='Password' />
                    </S.InputsContainer>
                    <S.ButtonContainer>
                        <Button size='xl' color='dark' disabled>Create account</Button>
                        <div>
                            <hr/><span>or continue</span><hr/>
                        </div>
                        <Button size='l' color='light' navigateTo='/login'>Login</Button>
                    </S.ButtonContainer>
                </S.Form>
        </S.Section>
    )
};

export default CreateAccount;