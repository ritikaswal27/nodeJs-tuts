//file system module
// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

//To control the flow and also to avoid callback hell(i.e so many callback functions inside the function)
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you."
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
  } catch (err) {
    console.error(err);
  }
};

fileOps();

/*          Basic method
fs.readFile("./files/starter.txt", (err, data) => {
   if (err) throw err;
   console.log(data);
   console.log(data.toString());
 });
*/
/*
//      Preffered way of writing
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
*/
/*     adding encoding method
fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
*/

/*
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you.",
  (err) => {
    if (err) throw err;
    console.log("Write complete");
  }
);
*/

// append can update data in the file and can even create a file incase it's not present
// fs.appendFile(
//   path.join(__dirname, "files", "test.txt"),
//   "Testing text.",
//   (err) => {
//     if (err) throw err;
//     console.log("Append complete");
//   }
// );

// readFile and the functions and methods you will find from node will be asynchronous
console.log("Hello World"); // This will be printed first

//exit on uncaught errors
process.on("uncaughtException", (err) => {
  // process is golbal object in node js
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
