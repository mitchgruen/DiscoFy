import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Homepage } from "../Homepage/Homepage";
import { NotFound } from "../NotFound/NotFound";
import { Link } from "react-router-dom";
import "./App.scss";
import './App.scss';
import Chat from "../MessageRoom/Chat";

export function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Homepage user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/chat" element={<Chat />} />
        {/* this route is for pages that doesn't exist.  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
