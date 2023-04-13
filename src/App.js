import React from "react";
import { Route, Routes } from "react-router";

import WelcomeScreen from "./pages/WelcomeScreen";
import CreateAccount from "./pages/CreateAccount";
import Login from './pages/Login';
import PasswordRecovery from "./pages/PasswordRecovery";
import CreateTask from "./pages/CreateTask";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomeScreen/>} />
      <Route path='/create-account' element={<CreateAccount/>} />
      <Route path='/login' element={<Login />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/create-task" element={<CreateTask />} />
    </Routes>
  )
};

export default App;
