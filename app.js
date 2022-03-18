const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const middleware = require("./utils/middleware");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

// Import necessary routers

const app = express();

//Some necessary middlewares
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.set("view engine", "html");
app.use(middleware.requestLogger);

//  For production Serving static files
// app.use(express.static(path.join(__dirname, "client/build")));

// Here write all api endpoints
// ex  app.use('/api/v1/user', userRouter)

// For production
// app.get("*", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "/client/build/index.html"));
//   });

// This will occur if there is no endpoint matching
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
