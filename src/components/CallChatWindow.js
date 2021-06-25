import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            background: '#1d0b6e'
            //marginLeft: theme.spacing(45)
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
        background: '#1d0b6e'
    }
}));

const CallChatWindow = ({ flag, onCallChatWindowClick }) => {
    const classes = useStyles();

    return (
        <div className="ShowChat">
            <div className={classes.root}>
                <Fab color="primary" aria-label="add" onClick={onCallChatWindowClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </Fab>
            </div>
        </div>
    );
};

CallChatWindow.propTypes = {
    flag: PropTypes.string.isRequired,
    onCallChatWindowClick: PropTypes.func
};

export default CallChatWindow;
