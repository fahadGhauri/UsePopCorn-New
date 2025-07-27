import React from "react";
import "./Weather.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((curstate) => {
      return { count: curstate.count - 1 };
    });
  }

  handleIncrement() {
    this.setState((curstate) => {
      return { count: curstate.count + 1 };
    });
  }
  render() {
    const date = new Date("june 24 2025");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
