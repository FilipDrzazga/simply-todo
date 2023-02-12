import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from "./styled/globalStyle";
import { ThemeProvider } from "styled-components";
import { rules } from './styled/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={rules}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
