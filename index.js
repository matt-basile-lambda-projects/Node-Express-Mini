
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const users = require('./data/db.js')

// creates an express application using the express module
const server = express();

// GET ALL USERS - R in CRUD
server.get('/users', (req, res) => {
  users
  .find()
  .then(users => {
    res.status(200).json({success: true, users})
  })
  .catch(({code, message}) =>{
    res.status(code).json({success: false, message})
})
});
//GET A USER - R in CRUD

server.get('/users/:id', (req, res) => {
  const {id} = req.params;
  users
  .findById(id)
  .then(users => {
    res.status(200).json({success: true, users})
  })
  .catch(({code, message}) =>{
    res.status(code).json({success: false, message})
})
});


// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));





// configures our server to execute a function for every GET request to "/"
// // the second argument passed to the .get() method is the "Route Handler Function"
// // the route handler function will run on every GET request to "/"
// server.get('/', (req, res) => {
//   // express will pass the request and response objects to this function
//   // the .send() on the response object can be used to send a response to the client
//   res.send('Hello World');
// });