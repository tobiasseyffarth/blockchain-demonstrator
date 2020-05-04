import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import * as Cryptohelper from '../../util/cryptoHelper';
import stateModelCryptobasic from '../../logic/ui/statemodelCrypto';

export default class Cryptobasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHash: '',
      hash: '',
      publickey: '',
      privatekey: '',
      keylength: 1024,
      message: '',
      encrypt: '',
      toDecrypt: '',
      decrypt: ''
    }
    this.handleClickHash = this.handleClickHash.bind(this);
    this.handleClickCreateKey = this.handleClickCreateKey.bind(this);
    this.handleClickDecrypt = this.handleClickDecrypt.bind(this);
    this.handleClickEncrypt = this.handleClickEncrypt.bind(this);

  }

  componentDidMount() {
    this.setState({ inputHash: stateModelCryptobasic.inputHash });
    this.setState({ hash: stateModelCryptobasic.hash });
    this.setState({ publickey: stateModelCryptobasic.publickey });
    this.setState({ privatekey: stateModelCryptobasic.privatekey });
    this.setState({ message: stateModelCryptobasic.message });
    this.setState({ encrypt: stateModelCryptobasic.encrypt });
    this.setState({ toDecrypt: stateModelCryptobasic.toDecrypt });
    this.setState({ decrypt: stateModelCryptobasic.decrypt });
  }

  componentWillUnmount() {
    stateModelCryptobasic.inputHash = this.state.inputHash;
    stateModelCryptobasic.hash = this.state.hash;
    stateModelCryptobasic.publickey = this.state.publickey;
    stateModelCryptobasic.privatekey = this.state.privatekey;
    stateModelCryptobasic.message = this.state.message;
    stateModelCryptobasic.encrypt = this.state.encrypt;
    stateModelCryptobasic.toDecrypt = this.state.toDecrypt;
    stateModelCryptobasic.decrypt = this.state.decrypt;
  }

  handleClickHash() {
    const hash = Cryptohelper.getHash(this.state.inputHash);
    this.setState({ hash: hash });
  }

  async handleClickCreateKey() {
    const key = await Cryptohelper.createKeyPair(this.state.keylength);
    this.setState({ privatekey: key.privateKey });
    this.setState({ publickey: key.publicKey });
  }

  handleClickEncrypt() {
    const key = this.state.publickey;
    const message = this.state.message
    const encrypt = Cryptohelper.encrypt(key, message);
    this.setState({ encrypt: encrypt });
  }

  handleClickDecrypt() {
    const key = this.state.privatekey;
    const toDecrypt = this.state.toDecrypt
    const decrypt = Cryptohelper.decrypt(toDecrypt, key);
    this.setState({ decrypt: decrypt });
  }

  render() {
    return (
      <div>
        <h2>Hash input</h2>
        <Button label="Hash input" onClick={this.handleClickHash} />
        <p></p>
        <InputTextarea
          rows={2}
          value={this.state.inputHash}
          onChange={(e) => this.setState({ inputHash: e.target.value })}
          style={{ width: '50%' }}
        />
        <InputTextarea
          rows={2}
          value={this.state.hash}
          style={{ width: '50%' }}
          readOnly
        />
        <hr />
        <h2>Create key pair</h2>
        <Button
          label="Create"
          onClick={this.handleClickCreateKey}
        />
        <p></p>
        <InputTextarea
          rows={8}
          value={this.state.publickey}
          style={{ width: '50%' }}
          readOnly
        />
        <InputTextarea
          rows={8}
          value={this.state.privatekey}
          style={{ width: '50%' }}
          readOnly
        />
        <hr />
        <h2>Encrypt text</h2>
        <Button label="Encrypt" onClick={this.handleClickEncrypt} />
        <p></p>
        <InputTextarea
          rows={5}
          value={this.state.message}
          style={{ width: '50%' }}
          onChange={(e) => this.setState({ message: e.target.value })}
        />
        <InputTextarea
          rows={5}
          value={this.state.encrypt}
          style={{ width: '50%' }}
        />
        <hr />
        <h2>Decrypt text</h2>
        <Button label="Decrypt" onClick={this.handleClickDecrypt} />
        <p></p>
        <InputTextarea
          rows={5}
          value={this.state.toDecrypt}
          onChange={(e) => this.setState({ toDecrypt: e.target.value })}
          style={{ width: '50%' }}
        />
        <InputTextarea
          rows={5}
          value={this.state.decrypt}
          style={{ width: '50%' }}
        />
      </div>
    );
  }
}