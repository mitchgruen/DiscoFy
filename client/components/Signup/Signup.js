import React from "react";
import styles from './Signup.scss'
import Button from 'react-bootstrap/Button';


export const Signup = () => {
  // const [username, setUserName] = useState();
  // const [password, setPassword] = useState();

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
      <h1>Please Signup </h1>
      <form >
        <label>
          <p>Username</p>
          <input type="text" placeholder="Enter ussername" /> 
          {/* onChange={e => setUserName(e.target.value)} */}
        </label>
        <label>
          <p>Password</p>
          <input type="password" placeholder="Enter password" />
          {/* onChange={e => setPassword(e.target.value)} */}
        </label>
        <div>
        <Button type="submit" variant="primary">Submit</Button>
        </div>
      </form>
    </div>
  )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }