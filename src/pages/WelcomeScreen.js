import React from "react";
import Button from "../Components/Button";

import * as S from '../styled/WelcomeScreen.styled';

import abstract from '../Image/abstract.jpg';
import abstractMobile from '../Image/abstract-mobile.jpg';
import abstractTablet from '../Image/abstract-tablet.jpg';
import abstractDesktop from '../Image/abstract-desktop.jpg';

const WelcomeScreen = () => {
    return (
        <S.Section>
            <header>
                <h1>Welcome on board.</h1>
                <h2>Let’s make things happen.</h2>
            </header>
            <picture>
                <source srcSet={abstractMobile} media='(min-width:320px)'></source>
                <source srcSet={abstractTablet} media='(min-width:768px)'></source>
                <source srcSet={abstractDesktop} media='(min-width:1024px)'></source>
                <img src={abstract} alt='abstract'></img>
            </picture>
            <S.ButtonContainer>
                <Button size='xl' color='dark'>Create account</Button>
                <Button size='xl' color='light'>Login</Button>
            </S.ButtonContainer>
        </S.Section>
    )
};

export default WelcomeScreen;