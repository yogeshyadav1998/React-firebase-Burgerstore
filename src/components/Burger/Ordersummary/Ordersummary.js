import React from 'react';

import Aux from '../../../hoc/Auxs/Aux';
import Button from '../../UI/Button/Button';

const ordersummary = (props) => {
    const ingredientsummary = Object.keys(props.ingredients)
    .map(igkey =>{
        return (
            <li key={igkey}>
                <span style={{textTransform:'capitalize'}}>{igkey}</span>:{props.ingredients[igkey]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burgur with following ingredients:</p>
            <ul>
                {ingredientsummary}
            </ul>
            <p><strong>Total Price = {props.totalprice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btntype="Danger" clicked={props.purchasecancelled}>Cancel</Button>
            <Button btntype="Success" clicked={props.purchasecontinued}>Continue</Button>
        </Aux>
    )
}

export default ordersummary ;