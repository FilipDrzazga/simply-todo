import React from "react";
import WelcomeScreen from "./Components/WelcomeScreen";

import { GlobalStyle } from "./styled/globalStyle";
import { ThemeProvider } from "styled-components";
import { rules } from './styled/theme';

const App = () => {
  return (
    <ThemeProvider theme={rules}>
      <GlobalStyle/>
      <WelcomeScreen/>
    </ThemeProvider>
  )
};

export default App;
