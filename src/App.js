import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { auth } from "./firebase/firebase";

import WelcomeScreen from "./pages/WelcomeScreen";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import Todo from "./pages/Todo";

const App = () => {
  console.log(auth.currentUser);
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default App;
