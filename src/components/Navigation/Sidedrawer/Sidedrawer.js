import React from 'react';

import classes from './Sidedrawer.css';
import Logo from './../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxs/Auxs';

const sidedrawer = (props) => {
    let attachedclasses = [classes.Sidedrawer , classes.Close];
    if(props.open){
        attachedclasses = [classes.Sidedrawer , classes.Open];
    }

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedclasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <Navigationitems/>
                </nav>
            </div>
        </Aux>
    )
};

export default sidedrawer ;
