import React, { Component } from 'react';
import Message from './Message';
import './styles.css';
import PropTypes from 'prop-types';

class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: props.messages
        };
    }

  strToComponent = () => {
      return this.state.messages.map((msg1, index) => (
          <Message key={index} msg={msg1.msg} sender={msg1.sender} />
      ));
  };

  render () {
      return (
          <div>
              <div className="MessageList">{this.strToComponent()}</div>
          </div>
      );
  }
}

MessageList.propTypes = {
    messages: PropTypes.array
};

export default MessageList;
