import React from 'react';

import classes from './Navigationitems.css';
import Navigationitem from './Navigationitem/Navigationitem';

const Navigationitems = () => (
    <ul className={classes.Navigationitems}>
        <Navigationitem Link="/" exact>Burgur Builder</Navigationitem>
        <Navigationitem Link="/orders">Orders</Navigationitem>
    </ul>
)

export default Navigationitems;