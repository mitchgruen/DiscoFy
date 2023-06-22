import React, { useState, useEffect } from "react";
import Chatbox from "../Chatbox/Chatbox.js";
import NewActivity from "../NewActivity/NewActivity.js";
import { ChatGPTForm } from "../ChatGPTForm/ChatGPTForm.js";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './Homepage.scss';
import ActivityList from "../ActivityList/ActivityList.js";

export const Homepage = (props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
      <div className="mainContainer">
        <ChatGPTForm user={props.user} className="GPTForm" />
        <ActivityList />
      </div>
    </div>
  );
};
