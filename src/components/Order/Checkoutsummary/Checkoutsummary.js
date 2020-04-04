import React from 'react';

import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import classes from './Checkoutsummary.css';

const checkoutsummary = (props) =>{
    return(
        <div className={classes.Checkoutsummary}>
            <h1>We hope it tastes well !!!</h1>
            <div style={{
                width:"100%",
                height:"250px",
                margin:"auto"
            }}>
                <Burger ingredients ={props.ingredients}/>
            </div>
            <div>
            <Button btntype="Danger" clicked={props.checkoutcancelled} >Cancel</Button>
            <Button btntype="Success" clicked={props.checkoutcontinued} >Continue</Button>
            </div>
        </div>
    )
}

export default checkoutsummary;