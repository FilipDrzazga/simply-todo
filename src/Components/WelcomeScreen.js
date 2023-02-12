import React from "react";
import abstract from '../Image/abstract.jpg';
import abstractMobile from '../Image/abstract-mobile.jpg';
import abstractTablet from '../Image/abstract-tablet.jpg';
import abstractDesktop from '../Image/abstract-desktop.jpg';

const WelcomeScreen = () => {
    return (
        <section>
            <picture>
                <source srcSet={abstractMobile}></source>
                <source srcSet={abstractTablet}></source>
                <source srcSet={abstractDesktop}></source>
                <img src={abstract} alt='abstract'></img>
            </picture>
        </section>
    )
};

export default WelcomeScreen;