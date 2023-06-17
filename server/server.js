const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const PORT = 3000;
//this is the problem
const userRouter = require('./routes/userRouter');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//user routes

app.use('/user', userRouter);

//catch an error
app.use('*', (req, res) => res.status(400).send('Oh no! There is an error!'))

//global error
app.use((err, req, res, next) => {
  res.status(500).send({error:err});
})

mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
  )
  .then(() => {
    app.listen(PORT, () => {
      `listening on ${PORT}`
    });
    console.log('Connected to MongoDB')
    .catch(err => console.log(err));
  })

  // app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));