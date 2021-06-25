import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const icon = sender => {
    return sender === '1' ? faSmile : faSkull;
};

const Message = ({ msg, sender }) => {
    return (
        <Row>
            <Col
                sm={12}
                md={12}
                lg={12}
                className={sender === '1' ? 'msgContClient' : 'msgContServer'}
            >
                <FontAwesomeIcon
                    className={sender === '1' ? 'noIcon' : 'iConServer'}
                    icon={icon(sender)}
                    size="2x"
                />
                <span className={sender === '1' ? 'msgClient' : 'msgServer'}>
                    {' '}
                    {msg}{' '}
                </span>
                <FontAwesomeIcon
                    className={sender === '1' ? 'iconClient' : 'noIcon'}
                    icon={icon(sender)}
                    size="2x"
                />
            </Col>
        </Row>
    );
};

Message.propTypes = {
    msg: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired
};

export default Message;
