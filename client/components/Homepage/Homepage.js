import React, { useState, useEffect } from "react";
import Chatbox from "../Chatbox/Chatbox.js";
import NewActivity from "../NewActivity/NewActivity.js";
import { ChatGPTForm } from "../ChatGPTForm/ChatGPTForm.js";
import axios from "axios";


export const Homepage = (props) => {

  return (
    <div>
      <ChatGPTForm user={props.user} />
    </div>
  );
};
