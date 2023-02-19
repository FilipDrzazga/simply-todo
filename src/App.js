import React from "react";
import { Route, Routes } from "react-router";
import WelcomeScreen from "./pages/WelcomeScreen";
import CreateAccount from "./pages/CreateAccount";
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomeScreen/>} />
      <Route path='/createAccount' element={<CreateAccount/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
};

export default App;
