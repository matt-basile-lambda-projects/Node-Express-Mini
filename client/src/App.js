import React, { Component } from 'react';

import './App.css';
import Axios from 'axios';

class App extends Component {
  state={
    users: []
  }
  componentDidMount(){
    this.getUsers();
  }
  getUsers = () =>{
    Axios.get('http://localhost:8000/api/users')
    .then(res => this.setState({users: res.data.users}))
    .catch(err => console.log(err))
  }
  removeUser = (e, user)=>{
    e.preventDefault()
    const id = user.id
    Axios.delete(`http://localhost:8000/api/users/${id}`)
    .then(res => console.log(res))
    .then(this.getUsers)
    .catch(err => console.log(err))
  }


  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        {this.state.users.map(user => {
          return (
            <div  key={user.id}>
              <p>{user.name}</p>
              <p>{user.bio}</p>
              <button onClick={e => this.removeUser(e,user)}>Delete</button>
          </div>
          )
        })}
      </div>
    );
  }
}

export default App;
