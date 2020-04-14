import React from 'react';

import classes from './Navigationitems.css';
import Navigationitem from './Navigationitem/Navigationitem';

const Navigationitems = (props) => (
    <ul className={classes.Navigationitems}>
        <Navigationitem Link="/" exact>Burgur Builder</Navigationitem>
        {props.isauth ? <Navigationitem Link="/orders">Orders</Navigationitem> : null}
        {!props.isauth ? <Navigationitem Link="/auth">SignIn/SigUp</Navigationitem> : <Navigationitem Link="/logout">Logout</Navigationitem>}
    </ul>
)

export default Navigationitems;