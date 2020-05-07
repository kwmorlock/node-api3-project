// code away!
//npm i and npm install express

const server = require('./server.js');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
// app.listen(port);

server.listen(port, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});

