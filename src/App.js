import React from "react";
import { Route, Routes } from "react-router";
import WelcomeScreen from "./pages/WelcomeScreen";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomeScreen/>} />
    </Routes>
  )
};

export default App;
