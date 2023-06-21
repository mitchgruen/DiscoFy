const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
const PORT = 8000;
//this is the problem

dotenv.config();

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/userRouter");
const apiRouter = require("./routes/apiRouter");

//user routes
app.use("/user", userRouter);
app.use("/api", apiRouter);

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
  res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
  console.log(req.query.code);
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  return res.send("its working");
});

// Access to users information ex: email, name
// oauth2Client.getTokenInfo().then(info =>{
//     info.
// })

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

// WHERE IS THE MONGO_URI?
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // confirms that the connection works (just a console log to confirm we are connected).
// mongoose.connection.once("open", () => {
//   console.log("Connected to Database");
// });

//catch an error

// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
app.use("*", (req, res) => res.status(400).send("Oh no! There is an error!"));

//global error
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log("Listening on port 8000... idea generator app");
});
// mongoose.connect(
//   process.env.MONGO_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
// )
//   .then(() => {
//     app.listen(PORT, () => {
//       `listening on ${PORT}`
//     });
//     console.log('Connected to MongoDB')
//       .catch(err => console.log(err));
//    app.use('/', userRouter);
//   })
