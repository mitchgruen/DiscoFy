import React from "react";
import styles from './Homepage.js'

import { Link } from "react-router-dom";
export const Homepage = () => {
  return (
    <div>
      <h1>testing from the home page</h1>
      <Link to="/idea">  <button>Generate Event Ideas</button></Link>
      <form>
        <input type="text" className="input-box" placeholder="Your Idea"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}