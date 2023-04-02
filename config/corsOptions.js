// const whitelist = [
//   "https://www.google.com",
//   "http://127.0.0.1:5500",
//   "http://localhost:3500",
// ];
const allowedOrigins = require("./allowedOrigins");
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
