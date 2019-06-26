import React, { Component } from 'react'

class MessagesList extends Component {
  render() {
    // const styles = {
    //   container: {
    //     overflowY: 'scroll',
    //     flex: 1,
    //   },
    //   ul: {
    //     listStyle: 'none',
    //   },
    //   li: {
    //     marginTop: 13,
    //     marginBottom: 13,
    //   },
    //   senderUsername: {
    //     fontWeight: 'bold',
    //   },
    //   message: { fontSize: 15 },
    // }
    return (
    //   <div
    //     style={{
    //       ...this.props.style,
    //       ...styles.container,
    //     }}
    //   >
        // <ul style={styles.ul}>
        <ul>
          {this.props.messages.map((message, index) => (
            // <li key={index} style={styles.li}>
            <li key={index}>
              <div>
                {/* <span style={styles.senderUsername}>{message.senderId}</span>{' '} */}
                <span>{message.senderId}</span>{' '}
              </div>
              {/* <p style={styles.message}>{message.text}</p> */}
              <p>{message.text}</p>
            </li>
          ))}
        </ul>
    //   </div>
    )
  }
}

export default MessagesList