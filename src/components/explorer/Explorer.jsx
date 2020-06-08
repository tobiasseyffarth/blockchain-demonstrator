import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import Transaction from '../Transaction';
import Blockchain from '../../logic/blockchain/blockchain';
import * as QueryHandler from '../../logic/handler/queryHandler';
import * as CheckHandler from '../../logic/handler/checkHandler';
import '../../App.css'

export default class Explorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myState: null,
      transactions: [],
      amount: 0,
      noTransactions: 0,
      noBlocks: 0,
      blocks: [],
    }
    this.checkIntegrity= this.checkIntegrity.bind(this);
  }

  componentDidMount() {
    this.queryBlockchain();
  }

  queryBlockchain() {
    const address = '2f8eb135b506266a75840a37252a07cd2e6bdaddb8d1409c49f2d3bafa40cb94';

    const transactions = QueryHandler.getTransactions(Blockchain);
    console.log('get all TX', transactions);
    this.setState({ transactions: transactions });

    try {
      this.setState({ noTransactions: transactions.length });
      this.setState({ blocks: Blockchain.getBlocks() });
      this.setState({ noBlocks: Blockchain.getBlocks().length });
    } catch (e) {
      console.log(e);
    }

    const totalAmount = QueryHandler.getTotalAmount(Blockchain);
    console.log('get total amount', totalAmount);
    this.setState({ amount: totalAmount });

    const amount = QueryHandler.getAmountByAddress(Blockchain, address);
    console.log('get Amount of adress', amount);

    const addreses = QueryHandler.getAddresses(Blockchain);
    console.log('adresses', addreses);

    const isValid = QueryHandler.isValidAdress(Blockchain, 'ba2605327c918dde80b08e6827ed4610ef50fd27229d44ead7f7f28c21cd5507');
    console.log('is valid', isValid);

    const txByAddress = QueryHandler.getTransactionByAdress(Blockchain, 'genesis');
    console.log('Transactions by adress', txByAddress);
  }

  checkIntegrity() {
    const result = CheckHandler.checkBlockchain(Blockchain);
        
    this.growl.show({
      severity: 'info',
      summary: 'Integritiy checked',
      detail: 'result: ' + result 
    });
  }

  renderBlocks() {
    return (
      this.state.blocks.map(block => (
        <div>
          <section className="flex-container">
            <div className="container-content">
              <div>Block ID: {block.blockheader.id}</div>
              <div>Date: {new Date(block.blockheader.time).toLocaleString()}</div>
              <div>Nonce: {block.blockheader.nonce}</div>
              <div>Prevhash: {block.blockheader.prevhash}</div>
              <div>Hash MerkleRoot: {block.blockheader.hashMerkleRoot}</div>
            </div>
            <div className="container-content">
              <Transaction transaction={block.transaction} />
            </div>
          </section>
          <hr />
        </div>
      ))
    )
  }

  render() {
    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <Button
          label="Verify integrity"
          onClick={this.checkIntegrity}
        />
        <p>Overall amount: {this.state.amount}</p>
        <p>Number of blocks: {this.state.noBlocks}</p>
        <p>Number of transactions {this.state.noTransactions}</p>
        <hr />
        {this.renderBlocks()}
      </div>
    );
  }
}
