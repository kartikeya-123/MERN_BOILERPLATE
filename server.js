const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./utils/config");

// First MONGODB connection and the server starts listening to the port

const server = http.createServer(app);

dotenv.config();

console.log("Starting app..");
//console.log("Waiting for connection to MongoDB");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log("Starting webserver..");
    server.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch(() => {
    console.log("Could not connect to MongoDB server! Shutting down...");
    process.exit(1);
  });
