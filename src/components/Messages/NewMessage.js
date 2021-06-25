import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import './styles.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Row, Col } from 'react-flexbox-grid';

class NewMessage extends Component {
    render () {
        const useStyles = makeStyles(theme => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            input: {
                margin: theme.spacing(2),
                alignItems: 'right'
            }
        }));

        const classes = useStyles;

        return (
            <Row className="NewMessage" around="md">
                <Col>
                    <Input
                        placeholder="Send a new message"
                        className={classes.input}
                        inputProps={{ 'aria-label': 'description' }}
                        onChange={this.props.onMessageChange}
                        value={this.props.valor}
                        fullWidth
                        onKeyDown={this.props.onKeyDown}
                    />
                </Col>
                <Col>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={this.props.onClickSend}
                    >
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </Button>
                </Col>
            </Row>
        );
    }
}

NewMessage.propTypes = {
    onClickSend: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMessageChange: PropTypes.func,
    valor: PropTypes.string
};

export default NewMessage;
