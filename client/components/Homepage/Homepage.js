import React from "react";
import styles from './Homepage.js'
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";
export const Homepage = () => {
  // need to be able to make a get request to chatgbt
  // need to create a button handler
  const buttonHandler = () => {
    useEffect(() => {
      fetch('URL')
        .then(data => { return data.json() })
        .then((data) => {

        }).catch((err) => {
          console.log(err, 'error on the fetch get request')
        })
    }, [])
  }
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