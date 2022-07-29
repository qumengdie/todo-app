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
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(this.state);
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button>login</button>
            </div>
        )
    }
}

export default TodoApp;