import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { signInWithGoogle } from '../firebase.js';

export function Login(props) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // harcoded user for testing
    props.setUser({
        email: 'mitchellgruen@gmail.com',
        name: 'Mitch'
      })
    navigate('/home');

    // Old Google Auth code that relies on Firebase, might rebuild this
    // await signInWithGoogle().then(async (data) => {
    //   const url = await fetch('http://localhost:8000/google');
    //   const parsedData = await url.json();
    //   console.log(parsedData);
    //   window.open(parsedData, "_blank", "popup");
    //   console.log("User: ", data);
    //   props.setUser({
    //     email: data.email,
    //     name: data.displayName
    //   })
    // });
  }

  return (
    <div className="login-wrapper">
      <h1>Welcome! Please Log In</h1>
        <button onClick={handleSubmit} variant="primary">Google Log In</button>{' '}
    </div>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }