import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import withNavigation from './WithNavigation.jsx'
import withParams from './WithParams.jsx';
import '/Users/qumengdie/Downloads/Projects/Todo/todo-app/src/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css';

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation/>} />
                        <Route path="/login" element={<LoginComponentWithNavigation/>} />
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams/>} /> 
                        <Route path="/todos" element={<ListTodosComponent/>} /> 
                        <Route path="*" element={<ErrorComponent/>} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className='navbar-brand'>QMD</a></div>
                    <ul className="navbar-nav">
                        <li className="nav-link"><Link className="nav-link" to="/welcome/qumengdie">Home</Link></li>
                        <li className="nav-link"><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li className="nav-link"><Link className="nav-link" to="/login">Login</Link></li>
                        <li className="nav-link"><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <hr/>Footer
            </div>
        )
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos : 
            [
                {id: 1, description: 'Cook', done: false, targetDate: new Date()},
                {id: 2, description: 'Eat', done: false, targetDate: new Date()},
                {id: 3, description: 'Swim', done: false, targetDate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>description</th>
                            <th>done?</th>
                            <th>target date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>
                Welcome {this.props.params.name}! You can manage your todos <Link to="/todos">here</Link>.
            </div>
    }
}

function ErrorComponent() {
        return <div>Erorr! This is an invalid page!</div>
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
            this.props.navigate(`/welcome/${this.state.username}`)   
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
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Succeeded</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>login</button>
            </div>
        )
    }
}

export default TodoApp;