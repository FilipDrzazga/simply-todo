import React from "react";
import * as S from "../styled/CreateAccount.styled";
import Button from "../Components/Button";

import abstractMobile from '../Image/abstract-mobile.jpg';

const CreateAccount = () => {
    return (
        <S.Section>
            <header>
                <h1>Login.</h1>
                <h2>Let's make things happen.</h2>
            </header>
            <figure>
                <img src={abstractMobile} alt='abstract' />
            </figure>
                <S.Form>
                    <S.InputsContainer>
                        <label htmlFor='email'>Email
                        <input id='email' type='text' placeholder='Enter your Email...'></input></label>
                        <label htmlFor="password">Password
                        <input id="password" type='text' placeholder="Enter your password..."></input></label>
                    </S.InputsContainer>
                    <S.ButtonContainer>
                        <Button size='xl' color='dark' disabled>Login</Button>
                        <div>
                            <hr/><span>or continue</span><hr/>
                        </div>
                        <Button size='l' color='light' navigateTo='/createAccount'>Create account</Button>
                    </S.ButtonContainer>
                </S.Form>
        </S.Section>
    )
};

export default CreateAccount;