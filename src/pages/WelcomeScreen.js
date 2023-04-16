import React from "react";
import Button from "../Components/Button";

import * as S from '../styled/WelcomeScreen.styled';

import abstractMobile from '../image/abstract-mobile.jpg';

const WelcomeScreen = () => {
    return (
        <S.Section>
            <header>
                <h1>Welcome on board.</h1>
                <h2>Let’s make things happen.</h2>
            </header>
            <figure>
                <img src={abstractMobile} alt='abstract'/>
            </figure>
            <S.ButtonContainer>
                <Button size='100%' color='dark' navigateTo='/create-account'>Create account</Button>
                <Button size='100%' color='light' navigateTo='/login'>Login</Button>
            </S.ButtonContainer>
        </S.Section>
    )
};

export default WelcomeScreen;