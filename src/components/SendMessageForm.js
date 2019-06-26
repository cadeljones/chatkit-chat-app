import React from 'react'

class SendMessageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(e) {
        this.setState({
            text: e.target.value,
        })
        this.props.onChange()
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
    }

    render (){
        return <div>
            <form onSubmit={this.onSubmit}>
            <input 
            type='text'
            placeholder='enter text'
            onChange={this.onChange}>
            </input>
            <input type='submit' />
            </form>
        </div>
    }
}

export default SendMessageForm
