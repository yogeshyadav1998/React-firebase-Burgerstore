import React from 'react';

import classes from './Toolbar.css';
import Logo from './../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Drawertoggle from './../Sidedrawer/Drawertoggle/Drawertoggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Drawertoggle clicked={props.drawertoggleclicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <Navigationitems isauth={props.isauth}/>
        </nav>
    </header>
);

export default toolbar;