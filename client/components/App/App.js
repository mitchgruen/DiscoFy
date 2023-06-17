import { Route, Routes } from "react-router-dom";
import { Login } from '../Login/Login';
import { Homepage } from '../Homepage/Homepage'
import { Idea } from '../Idea/Idea'
import { Signup } from '../Signup/Signup'
import { NotFound } from '../Not Found/NotFound'
import { Link } from "react-router-dom";
import styles from './App.scss';
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
      </ul>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/idea" element={< Idea />} />
        {/* this route is for pages that doesn't exist.  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

