import React, { useState, useEffect } from "react";
import Chatbox from "../Chatbox/Chatbox.jsx";
import NewActivity from "../NewActivity/NewActivity.jsx";
import { ChatGPTForm } from "../ChatGPTForm/ChatGPTForm.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import './Homepage.scss';
import ActivityList from "../ActivityList/ActivityList.jsx";

export const Homepage = (props) => {
  return (
    <div>
      {/* <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul> */}
      <div className="mainContainer">
        <ChatGPTForm user={props.user} className="GPTForm" />
        <ActivityList />
      </div>
    </div>
  );
};
