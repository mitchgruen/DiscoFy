import React, { useState } from 'react';
import styles from './Login.scss'
import Button from 'react-bootstrap/Button';

//import PropTypes from 'prop-types';



// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

export function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = await loginUser({
//       username,
//       password
//     });
//     setToken(token);
  //}

  return(
    <div className="login-wrapper">
      <h1>Welcome! Please Log In</h1>
      <form >
        <label>
          <p>Username</p>
          <input type="text" placeholder='Enter username' onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" placeholder='Enter password' onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
        <Button type="submit" variant="primary">Submit</Button>{' '}
        </div>
      </form>
    </div>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }