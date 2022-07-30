import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import withNavigation from './WithNavigation.jsx'

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        return (
            <div className="TodoApp">
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/login" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/welcome" element={<WelcomeComponent/>}/> 
                    </Routes>
                </Router>
            </div>
        )
    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>Welcome!</div>
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
            this.props.navigate('/welcome')   
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
                {/*<ShowInvalidMessage hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Succeeded</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>login</button>
            </div>
        )
    }
}


// function ShowInvalidMessage(props) {
//         if (props.hasLoginFailed) {
//             return <div>Invalid Credentials</div>
//         }
//         return null;
// }

// function ShowLoginSuccessMessage(props) {
//     if (props.showSuccessMessage) {
//         return <div>Login Succeeded</div>
//     }
//     return null;
// }

export default TodoApp;