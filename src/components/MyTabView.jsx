import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Cryptobasic from './basic/Cryptobasic';
import Wallet from './wallet/Wallet';
import Explorer from './explorer/Explorer';

export default class MyTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myState: null,
    }
    this.myFunction = this.myFunction.bind(this);
  }

  myFunction() {
    console.log(this.state.myState);
  }

  componentDidMount() {
    console.log('did mount');
    this.setState({ myState: 'Hello' }, () => this.myFunction());
  }

  render() {
    return (
      <div>
        <div>
          <p>Heading</p>
        </div>
        <div>
          <TabView>
            <TabPanel header="Basic">
              <Cryptobasic />
            </TabPanel>
            <TabPanel header="Wallet">
            <Wallet />
            </TabPanel>
            <TabPanel header="Explorer">
            <Explorer />
            </TabPanel>
          </TabView>
        </div>
      </div>
    );
  }
}