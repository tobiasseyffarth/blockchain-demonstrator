import React, { Component } from 'react';

export default class Transaction extends Component {
  constructor(props) {
    super(props);

    this.renderDate = this.renderDate.bind(this);
  }

  componentDidMount() {
    console.log('mount');
  }

  renderDate(time) {
    const date = new Date(time);
    return date.toLocaleString();
  }

  /*
  render() {
    return (
      <div>
        {this.props.transactions.map(tx => (
          <div>
            <div>Date: {this.renderDate(tx.time)}</div>
            <div>Source: {tx.source}</div>
            <div>Target: {tx.target}</div>
            <div>Value: {tx.value}</div>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
  */

  render() {
    return (
      <div>
        <div>Date: {this.renderDate(this.props.transaction.time)}</div>
        <div>Source: {this.props.transaction.source}</div>
        <div>Target: {this.props.transaction.target}</div>
        <div>Value: {this.props.transaction.value}</div>
        <br></br>
      </div>
    );
  }
}