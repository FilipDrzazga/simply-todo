import React from "react";
import Button from "../Components/Button";
import Logo from "../Components/Logo";

import * as S from '../styled/WelcomeScreen.styled';

const WelcomeScreen = () => {
    return (
        <S.Section>
            <S.Header>
                <Logo/>
            </S.Header>
            <S.ButtonContainer>
                <Button size='90%' primary='true' navigateTo='/create-account'>Create account</Button>
                <Button size='90%' secondary='true' navigateTo='/login'>Login</Button>
            </S.ButtonContainer>
        </S.Section>
    )
};

export default WelcomeScreen;