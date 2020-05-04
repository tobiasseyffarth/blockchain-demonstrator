import React, { Component } from 'react';
import Transaction from '../Transaction';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import * as Transactionhandler from '../../logic/handler/transactionHandler';
import * as Cryptohelper from '../../util/cryptoHelper';
import * as QueryHandler from '../../logic/handler/queryHandler';
import Blockchain from '../../logic/blockchain/blockchain';

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
      displayNewAccount: false,
      displayAccount: false,
      privateKey: '',
      publicKey: '',
      amount: 0,
      transactions: [],
      sourceAdress: '',
      targetAddress: '',
      value: '',
    }
    this.showDialog = this.showDialog.bind(this);
    this.createNewAccount = this.createNewAccount.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (Blockchain.getBlocks().length == 0) {
      const genesisblock = Transactionhandler.createGenesisblock();
      Blockchain.addBlock(genesisblock);
    }
  }

  async createNewAccount() {
    const key = await Cryptohelper.createKeyPair(this.state.keylength);
    let privateKey;
    let publicKey;
    this.setState({ privateKey: key.privateKey }, () => privateKey = key.privateKey);
    this.setState({ publicKey: key.publicKey }, () => publicKey = key.publicKey);

    publicKey = publicKey.replace(/[\n\r]{1,2}/g, '');
    // create a newAccount Transaction
    const transaction = Transactionhandler.createNewAccountTransaction(publicKey);
    const address = transaction.target;
    //put Transaction into a block
    const block = Transactionhandler.createBlock(Blockchain, transaction);
    //add Block
    Blockchain.addBlock(block);
    // render account
    this.updateAccountInfo(address);
    this.showDialog('displayAccount');
  }

  login() {
    // create Hash from public key
    const privateKey = this.state.privateKey;
    let publicKey = this.state.publicKey;
    publicKey = publicKey.replace(/[\n\r]{1,2}/g, '');

    if (privateKey !== '' && publicKey !== '') {
      //find hash in Blockchain
      const address = Cryptohelper.getHash(publicKey);
      const isValidAdress = QueryHandler.isValidAdress(Blockchain, address);

      if (isValidAdress) {
        // compare private and public key
        const message = JSON.stringify(Math.random());
        const cipher = Cryptohelper.encrypt(this.state.publicKey, message);
        const decrypted = Cryptohelper.decrypt(cipher, this.state.privateKey);

        if (message === decrypted) {
          //render components
          this.updateAccountInfo(address);
          this.setState({ privateKey: '' });
          this.hideDialog('displayLogin');
          this.showDialog('displayAccount');
        } else {
          // Growl
        }
      }
    }
  }

  updateAccountInfo(address) {
    const amount = QueryHandler.getAmountByAddress(Blockchain, address);
    this.setState({ amount: amount });
    this.setState({ sourceAddress: address });

    // get Transactions
    const transactions = QueryHandler.getTransactionByAdress(Blockchain, address);
    this.setState({ transactions: transactions });
  }

  executeTransaction() {
    const sourceAddress = this.state.sourceAddress;
    const value = this.state.value;
    const targetAddress = this.state.targetAddress;

    // is Funded
    const isFunded = Transactionhandler.isFunded(Blockchain, sourceAddress, value);
    if (!isFunded) {
      // Growl
    }
    // is valid target address
    const isValid = QueryHandler.isValidAdress(Blockchain, targetAddress);
    if (!isValid) {
      // Growl
    }
    // create Transaction
    if (isValid && isFunded) {
      const transaction = Transactionhandler.createTransaction(sourceAddress, targetAddress, value, '');
      const block = Transactionhandler.createBlock(Blockchain, transaction);
      Blockchain.addBlock(block);

      // update accountinfo
      this.updateAccountInfo(sourceAddress);
      this.setState({ value: '' });
      this.setState({ targetAddress: '' });
    }
  }

  hideDialog(name) {
    this.setState({
      [`${name}`]: false
    });
    this.setState({ privateKey: '' });
    this.setState({ publicKey: '' });
  }

  showDialog(name) {
    this.setState({
      [`${name}`]: true
    });
  }

  renderLoginDialog() {
    return (
      <Dialog
        visible={this.state.displayLogin}
        style={{ width: '50vw' }}
        onHide={() => this.hideDialog('displayLogin')}
        header="Login"
      >
        <div>
          <p>Public Key</p>
          <InputTextarea
            rows={8}
            value={this.state.publicKey}
            style={{ width: '50%' }}
            onChange={(e) => this.setState({ publicKey: e.target.value })}
          />
          <p>Private Key</p>
          <InputTextarea
            rows={8}
            value={this.state.privateKey}
            style={{ width: '50%' }}
            onChange={(e) => this.setState({ privateKey: e.target.value })}
          />
          <Button
            label="Login"
            onClick={this.login}
          />
        </div>
      </Dialog>
    )
  }

  renderNewAccountDialog() {
    return (
      <Dialog
        visible={this.state.displayNewAccount}
        style={{ width: '50vw' }}
        onHide={() => this.hideDialog('displayNewAccount')}
        header="Create a new Account"
      >
        <div>
          <Button
            label="Create new Account"
            onClick={this.createNewAccount}
          />
          <p></p>
          <InputTextarea
            rows={8}
            value={this.state.publicKey}
            style={{ width: '50%' }}
            readOnly
          />
          <InputTextarea
            rows={8}
            value={this.state.privateKey}
            style={{ width: '50%' }}
            readOnly
          />
        </div>
      </Dialog>
    )
  }

  renderTransaction() {
    return (
      this.state.transactions.map(tx => (
        <Transaction transaction={tx} />
      ))
    )
  }

  renderAccountInfo(visible) {
    if (visible) {
      return (
        <div>
          <div>
            <p>My Address: {this.state.sourceAddress}</p>
            <p>Account amount: {this.state.amount}</p>
            <span className="p-float-label">
              <InputText
                id="in"
                value={this.state.targetAddress}
                onChange={(e) => this.setState({ targetAddress: e.target.value })}
                style={{ width: '250px' }}
              />
              <label htmlFor="in">target address</label>
            </span>
            <br />
            <span className="p-float-label">
              <InputText
                id="in"
                value={this.state.value}
                onChange={(e) => this.setState({ value: e.target.value })}
                style={{ width: '250px' }}
              />
              <label htmlFor="in">value</label>
            </span>
            <br />
            <Button
              label="Execute new transaction"
              onClick={() => this.executeTransaction()}
            />
          </div>
          <hr />
          <p>Transaction List</p>
          {this.renderTransaction()}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderLoginDialog()}
        {this.renderNewAccountDialog()}
        <div>
          <Button
            label="Create new Account"
            onClick={() => this.showDialog('displayNewAccount')}
          />
          <br></br>
          <Button
            label="Login"
            onClick={() => this.showDialog('displayLogin')}
          />
        </div>
        <br />
        {this.renderAccountInfo(this.state.displayAccount)}
      </div>
    );
  }
}