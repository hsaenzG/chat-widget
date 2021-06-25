import React, { Component } from 'react';
import './App.css';
import ChatLayout from './components/chatLayout';
import CallChatWindow from './components/CallChatWindow';
import PropTypes from 'prop-types';


const msg1 = {
    msg: 'Hola, en que puedo ayudarte?',
    sender: '2'
};
const msg2 = {
    msg: 'Hola, tengo un problema',
    sender: '1'
};
const msg3 = {
    msg: 'Me podrias dar mas detalles',
    sender: '2'
};

const msgList = [msg1, msg2, msg3];
class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            flag: '2',
            title: props.Title,
            welcomeMesg: props.welcomeMesg,
            messages: msgList
        };

        this.Click = this.Click.bind(this);
    }


  Click = flag => {
      var newflag = this.state.flag;
      if (this.state.flag === '1') { (newflag = '2'); } else { (newflag = '1');}
      this.setState({ flag: newflag });
  };

  render () {
      return (
          <div className="App">
              <ChatLayout
                  flag={this.state.flag}
                  title={this.state.title}
                  welcomeMesg={this.state.welcomeMesg}
                  messages={this.state.messages}
              />
              <CallChatWindow
                  flag={this.state.flag}
                  onCallChatWindowClick={this.Click}
              />
          </div>
      );
  }
}

App.propTypes = {
    Title: PropTypes.string,
    welcomeMesg: PropTypes.string
};

export default App;

