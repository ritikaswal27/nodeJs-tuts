const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);
// app.use((req, res, next) => {
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// third party middleware
// Cross Origin Resource Sharing
const whitelist = [
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//server static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  //   res.sendFile("./views/index.html", { root: __dirname });
  //   res.send("Hello World");
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 by default
});

//Route hanlders using multiple callbacks
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("hello world!");
  }
);

//chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 NOt found");
  }
});

// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send(err.message);
// });
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
This is a Node.js server using the Express.js framework. It sets up a server that listens on a specified port (default 3500), and has several routes defined for handling different requests.

The server uses several middlewares, both built-in and third-party. The logger middleware logs information about each incoming request, and the errorHandler middleware handles errors that occur during request processing. The cors middleware allows cross-origin resource sharing for specific origins listed in the whitelist.

The express.urlencoded() middleware is used to handle URL encoded data (form data), and express.json() is used to handle JSON data. The express.static() middleware serves static files from the public directory.

The server has several routes defined using the app.get() method. The ^/$|/index(.html)? route handles requests for the root or index.html, and serves the index.html file from the views directory. The hello(.html)? route responds with the text "hello world!" and logs a message to the console. The chain(.html)? route uses multiple callback functions to handle the request.

The app.all() method is used as a catch-all route for any requests that do not match the defined routes. It responds with a 404 error and serves either an HTML, JSON or plain text error message, depending on the accept headers of the request.

Overall, this code sets up a basic server that handles different types of requests and uses several middlewares to help with processing those requests.
*/
