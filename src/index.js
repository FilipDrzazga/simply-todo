import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styled/globalStyle";
import { ThemeProvider } from "styled-components";
import { rules } from "./styled/theme";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <ThemeProvider theme={rules}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
