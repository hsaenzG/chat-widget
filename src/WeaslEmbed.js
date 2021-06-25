import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UIActions from './modules/ui/actions';
import * as UISelectors from './modules/ui/selectors';
import * as SharedEventTypes from '../src/shared/eventTypes';
import PropTypes from 'prop-types';
import App from './App';
import './WeaslEmbed.css';


class WeaslEmbed extends Component {
    constructor (props) {
        super(props);
        window.addEventListener("message", this.receiveMessage, false);
    }

  receiveMessage = (event) => {
      if (this.isWeaslEvent(event)) {
          this.props.dispatch({ type: event.data.type, payload: event.data.value });
          console.log("Message Received");
      }
  }

  isWeaslEvent = (event) => {
      return !!event && event.data && event.data.type && event.data.type in SharedEventTypes;
  }
  /*
  handleCancelUserFlow = () => {
      this.props.actions.setViewAndType({ view: undefined, type: undefined });
      window.parent.postMessage({ type: SharedEventTypes.CANCEL_FLOW }, '*');
  }
*/
  render () {
      const {
          showAuthModal,
          showInfoMsg,
          isHidden
      } = this.props;
      console.log(showAuthModal);
      console.log(showInfoMsg);
      if (isHidden) {
          return null;
      }

      return (
          <div className="App">
              {<App />}
          </div>
      );
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        setViewAndType: UIActions.setViewAndType
    }, dispatch),
    dispatch
});

const mapStateToProps = state => ({
    showAuthModal: UISelectors.showAuthModal(state),
    showInfoMsg: UISelectors.showInfoMsg(state),
    isHidden: UISelectors.uiHidden(state)
});

WeaslEmbed.propTypes = {
    showAuthModal: PropTypes.string,
    showInfoMsg: PropTypes.string,
    isHidden: PropTypes.string,
    dispatch: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(WeaslEmbed);
