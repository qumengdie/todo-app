import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import React, {Component} from "react";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <LoginComponent/>
            </div>
        )
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'qumengdie',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState({[event.target.name]: event.target.value})
    }

    loginClicked() {
        if(this.state.username==='qumengdie' && this.state.password==='great') {
            console.log('successful')
            this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
        }
        else {
            console.log('Failed')
            this.setState({showSuccessMessage:false}) 
            this.setState({hasLoginFailed:true})
        }
            
        //console.log(this.state)

    }

    render() {
        return (
            <div>
                <ShowInvalidMessage hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>login</button>
            </div>
        )
    }
}


function ShowInvalidMessage(props) {
        if (props.hasLoginFailed) {
            return <div>Invalid Credentials</div>
        }
        return null;
}

function ShowLoginSuccessMessage(props) {
    if (props.showSuccessMessage) {
        return <div>Login Succeeded</div>
    }
    return null;
}

export default TodoApp;