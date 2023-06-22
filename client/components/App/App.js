import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Homepage } from "../Homepage/Homepage";
import { NotFound } from "../NotFound/NotFound";
import { Link } from "react-router-dom";
import "./App.scss";

export function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
      </ul>
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Homepage user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
