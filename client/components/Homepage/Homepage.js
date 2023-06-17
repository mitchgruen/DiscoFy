import React from "react";
import styles from './Homepage.scss'
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
      <div className="h1-container"><h2>Need Weekend Plans?</h2></div>
      <div className="generate-button-container">
        <Button onClick={() => { buttonHandler }} className="generate-button" size="lg" variant="warning">Generate Event Ideas</Button>{' '}
      </div>
      <form>
        <div className="form-content"><input type="text" className="input-box" placeholder="Your Idea"></input>
          <Button type="submit" variant="primary">Submit</Button>{' '}
        </div>
        <div className="redirect-idea-container">
          <Link to="/idea">
            <Button variant="info">See All Ideas</Button>{' '}
          </Link></div>
      </form>
    </div >
  )
}