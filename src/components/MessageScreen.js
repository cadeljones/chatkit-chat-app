import React from 'react';
import Chatkit from '@pusher/chatkit-client'
import MessagesList from './MessagesList.js'
import SendMessageForm from './SendMessageForm.js'
import TypingIndication from './TypingIndication.js'

class MessageScreen extends React.Component {
constructor(props){
    super(props)
    this.state={
        currentRoom: {},
        currentUser: {},
        messages:[],
        usersTyping: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingNotice = this.sendTypingNotice.bind(this)
}
componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:1f3056ca-986a-4f1d-b9e0-0cb679445f90',
        userId: this.props.currentUsername,
        tokenProvider: new Chatkit.TokenProvider({
            url: 'http://localhost:3001/authenticate'
        })
    })

    chatManager
    .connect()
    .then(currentUser => {
    this.setState({ currentUser })
    return currentUser.subscribeToRoom({
        roomId: '19408048',
        messageLimit: 100,
        hooks: {
        onMessage: message => {
            this.setState({
            messages: [...this.state.messages, message],
            })
            
        },
        onUserStartedTyping: user => {
            this.setState({
                usersTyping: [...this.state.usersTyping, user.name],
                })
        },
        onUserStoppedTyping: user => {
            this.setState({
                usersTyping: this.state.usersTyping.filter(
                    username => username != user.name
                )
                })
        }
        },
    })
    })
    .then(currentRoom => {
    this.setState({ currentRoom })
    })
    .catch(error => console.error('error', error))
}

sendMessage(text){
    this.state.currentUser.sendMessage({
        roomId: this.state.currentRoom.id,
        text
    })
}
sendTypingNotice(){
    this.state.currentUser.isTypingIn({roomId: this.state.currentRoom.id}
    ).catch(error => console.error('error', error))
}

render(){
    return <div>
        <h1> CHat</h1>
        <MessagesList messages={this.state.messages}/>
        <TypingIndication usersTyping={this.state.usersTyping} />
        <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingNotice}/>
    </div>
}
}

export default MessageScreen