import React, { Component } from 'react';

import './App.css';
import Axios from 'axios';

class App extends Component {
  state={
    users: []
  }
  componentDidMount(){
    Axios.get('http://localhost:8000/api/users')
    .then(res => this.setState({users: res.data.users}))
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
              <p >{user.bio}</p>
          </div>
          )
        })}
      </div>
    );
  }
}

export default App;
