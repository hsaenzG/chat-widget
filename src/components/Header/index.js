import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Header = ({ title, welcomeMesg }) => {
    console.log(title, welcomeMesg);
    return (
        <div className="headerComp">
            <h1>{title}</h1>
            <p>{welcomeMesg}</p>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    welcomeMesg: PropTypes.string.isRequired
};

export default Header;
