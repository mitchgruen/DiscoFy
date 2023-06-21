
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from '../Login/Login';
import { Homepage } from '../Homepage/Homepage'
import { Idea } from '../Idea/Idea'
import { Signup } from '../Signup/Signup'
import { NotFound } from '../NotFound/NotFound'
import { Link } from "react-router-dom";
import './App.scss';

//mongoose.connect(process.env.ADMIN_ID);

export function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/idea" element={< Idea />} />
        {/* this route is for pages that doesn't exist.  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

