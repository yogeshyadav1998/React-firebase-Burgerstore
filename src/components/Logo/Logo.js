import React from 'react';

import burgurlogo from './../../assets/images/burgurlogo.png';
import classes from './logo.css';

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burgurlogo} alt="Myburgur" />
    </div>
)

export default logo;