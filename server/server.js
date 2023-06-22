const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
const PORT = 8000;
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/userRouter");
const apiRouter = require("./routes/apiRouter");

app.use("/user", userRouter);
app.use("/api", apiRouter);

const apiController = require("./controller/apiController");

apiRouter.post("/", apiController.getResponse, (req, res) => {
  res.status(200).json(res.locals.ideas);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"] 
  }
});

io.on("connection", (socket) => {
  console.log('a user connected');

  socket.on("latest", (msg) => {
    console.log('Latest message: ' + msg);
  });

  socket.on("message", (msg) => {
    console.log('Received a message: ' + msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}... idea generator app`);
});
