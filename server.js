const express = require('express');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use("/api/posts", postRouter );
server.use("/api/users", userRouter);
//maybe out loggers in these

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
//       'Origin'
//     )}`
//   );

//   next();
// }
// server.use(logger);

function logger(req, res, next) {
console.log(req.method);
 console.log(req.url);
console.log(Date.now());
next();
}

server.use(logger);

module.exports = server;
