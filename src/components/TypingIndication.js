import React from 'react'

class TypingIndication extends React.Component {

    render(){
        return this.props.usersTyping.length == 0 ?
        <div></div> :
        <p>{this.props.usersTyping[0] + " is typing.."}</p>
    }
}

export default TypingIndication