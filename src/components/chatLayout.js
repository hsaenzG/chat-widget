import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Header from './Header';
import Messages from './Messages';
import NewMessage from './Messages/NewMessage';
import './styles.css';
import PropTypes from 'prop-types';

class ChatLayout extends Component {
  state = {
      flag: this.props.flag,
      title: 'My Chat', //this.props.title,
      welcomeMesg: 'Welcome!', //this.props.welcomeMesg,
      messages: this.props.messages,
      valor: ''
  };

  _add = () => {
      let { valor } = this.state;

      var data = {
          msg: valor,
          sender: '1'
      };

      var msg = this.state.messages;
      msg.push(data);
      this.setState({ messages: msg, valor: '' });
  };

  onMessageChange = e => {
      this.setState({ valor: e.target.value });
  };

  keyPress = e => {
      if (e.keyCode === 13) {
          this._add();
      }
  };

  render () {
      const { valor, messages } = this.state;

      return (
          <Grid
              className={
                  this.props.flag === '1' ? 'ChatLayoutCont' : 'ChatLayoutCont-hide'
              }
          >
              <Row>
                  <Col md>
                      <Header
                          title={this.state.title}
                          welcomeMesg={this.state.welcomeMesg}
                      />
                  </Col>
              </Row>
              <Row>
                  <Col md>
                      <Messages messages={messages} />
                  </Col>
              </Row>
              <Row>
                  <Col md>
                      <NewMessage
                          onClickSend={this._add}
                          onMessageChange={this.onMessageChange}
                          valor={valor}
                          onKeyDown={this.keyPress}
                      />
                  </Col>
              </Row>
          </Grid>
      );
  }
}

ChatLayout.propTypes = {
    flag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    welcomeMesg: PropTypes.string.isRequired,
    messages: PropTypes.array
};

export default ChatLayout;
