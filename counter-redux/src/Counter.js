import React, { Component } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "./Actions";
import "./App.css";

class Counter extends Component {
  state = { count: 0 };
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div>
        <p> Counter Value: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => {
  return { counter };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     incrementCounter: () => dispatch(increment),
//     decrementCounter: () => dispatch(decrement)
//   };
// };
export default connect(
  mapStateToProps,
  { increment, decrement }
)(Counter);
