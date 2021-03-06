const createError = require("http-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const noteRouter = require("./routes/note");

require('dotenv').config();

// Link to connect with MongoDB
const mongoLink = 'mongodb+srv://root:root@cluster0.s3jnd.mongodb.net/cluster0?retryWrites=true&w=majority';
// Port the backend runs on
const PORT = process.env.PORT || 3001;

//Connect MongoDB
const connect = mongoose
  .connect(mongoLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend");
});

app.use("/note", noteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, function () {
  console.log(`Server running, listening on port ${PORT}`);
});

module.exports = app;
