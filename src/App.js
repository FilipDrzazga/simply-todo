import React from "react";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

import WelcomeScreen from "./pages/WelcomeScreen";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import Todo from "./pages/Todo";

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
