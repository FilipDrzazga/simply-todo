import React from "react";
import WelcomeScreen from "./Components/WelcomeScreen";
import { GlobalStyle } from "./styled/globalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <WelcomeScreen/>
    </>
  )
};

export default App;
