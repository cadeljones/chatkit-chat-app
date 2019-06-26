import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm.js'
import MessageScreen from './components/MessageScreen.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: '',
    }
    this.onUsernameSubmit = this.onUsernameSubmit.bind(this)
  }
  onUsernameSubmit(username){
      fetch('http://localhost:3001/users',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({username}),
      }).then(response => {
        console.log('success')
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen',
        })
      }).catch(error => {
        console.log(error)
      })
  }
  render() {
    return this.state.currentScreen === 'WhatIsYourUsernameScreen' ?
    <UsernameForm onSubmit={this.onUsernameSubmit} /> :
    <MessageScreen currentUsername={this.state.currentUsername}/>
  }
}

export default App
