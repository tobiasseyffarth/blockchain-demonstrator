import { Component } from 'react';
import MyTabView from './components/MyTabView';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (    
      <div>
        <MyTabView />      
      </div>
    );
  }
}
