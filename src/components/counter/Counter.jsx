import React, {Component} from "react";
import PropTypes from 'prop-types'
import "./Counter.css"

class Counter extends Component {
    
    //Define the initial state in a constructor
    //state => counter 0
    constructor() {
        super();
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="counter">
            <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
        );
    }

    increment(by) {  //Update state 
        this.setState(
            (prevState) => {
            return {counter : prevState.counter + by}
        });
    }

    decrement(by) {  //Update state 
        this.setState(
            (prevState) => {
            return {counter : prevState.counter - by}
        });
    }

    reset() {
        this.setState({counter : 0});
    }
}

class CounterButton extends Component {

    //Define the initial state in a constructor
    //state => counter 0
    constructor() {
        super();
    } 


    render() {
        return (
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button> 
            </div>
        )
    }
    
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter;