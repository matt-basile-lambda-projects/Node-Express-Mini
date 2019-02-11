
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const users = require('./data/db.js')

const server = express();
server.use(express.json());

// creates an express application using the express module

//Console.log on Home route
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});
// GET ALL USERS - R in CRUD
server.get('/api/users', (req, res) => {
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
server.get('/api/users/:id', (req, res) => {
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
//ADD USER
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };
  if (!name || !bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  users.insert(newUser)
    .then(userId => {
      const { id } = userId;
      users.findById(id).then(user => {
        console.log(user);
        if (!user) {
          return res
            .status(422)
            .send({ Error: `User does not exist by that id ${id}` });
        }
        res.status(201).json(user);
      });
    })
    .catch(err => console.error(err));
});
//DELETE USER
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  users
  .remove(id)
  .then(updated =>{
    if(updated) {
        res.status(204).end();
    } else{
        res.status(404).json({success:false, message: 'These are not the hubs you\'re looking for'});
    }
  })
    .catch(({code, message}) =>{
      res.status(code).json({success: false, message})
  })
});
//Edit USER
server.put('/api/users/:id', (req,res)=>{
  const {id} = req.params;
  const changes = req.body;
  users.update(id, changes)
  .then(updated =>{
      if(updated) {
          res.status(201).json({success: true, updated});
      } else{
          res.status(404).json({success:false, message: 'Sorry no Hobbit exists with that ID'});
      }
  })
  .catch(({code, message}) =>{
      res.status(code).json({success: false, message})
  })
})







// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));






