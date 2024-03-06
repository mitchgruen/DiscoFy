import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Homepage } from "../Homepage/Homepage";
import { NotFound } from "../NotFound/NotFound";
// import { Link } from "react-router-dom";
import "./Router.scss";
import Chat from "../MessageRoom/Chat";

export default function Router() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Homepage user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
