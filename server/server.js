const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
const PORT = 8000;

dotenv.config();
//this is the problem
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(express.json());

const eventRouter = require("./routes/eventRouter");
const userRouter = require("./routes/userRouter");
const apiRouter = require("./routes/apiRouter");

//user routes
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/event", eventRouter);

const apiController = require("./controller/apiController");

apiRouter.post("/", apiController.getResponse, (req, res) => {
  res.status(200).json(res.locals.ideas);
});

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY,
});

app.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return res.json(url);
});

app.get("/google/redirect", async (req, res) => {
  console.log(req.query);
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  return res.status(200).json({
    msg: "Thank you for allowing us to access your Google Calendar!! You can close this now",
  });
});

app.get("/schedule_event", async (req, res) => {
  console.log(oauth2Client.credentials.access_token);
  await calendar.events.insert({
    calendarId: "primary",
    auth: oauth2Client,
    requestBody: {
      summary: "This is a test event",
      description: "Some event",
      start: {
        dateTime: dayjs(new Date()).add(1, "day").toISOString(),
        timeZone: "GMT-4",
      },
      end: {
        dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
        timeZone: "GMT-4",
      },
    },
  });

  res.send({
    msg: "Done",
  });
});

// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Hello from the backend");
});

// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
app.use("*", (req, res) => res.status(400).send("Oh no! There is an error!"));

//global error
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log("Listening on port 8000... idea generator app");
});
