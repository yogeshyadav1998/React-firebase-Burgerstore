import React from 'react';

import classes from './Buildcontrols.css';
import Buildcontrol from './Buildcontrol/Buildcontrol';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'}
]

const buildcontrols = (props) => (
    <div className={classes.Buildcontrols}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <Buildcontrol 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientadded(ctrl.type)}
                removed={() => props.ingredientremoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>Order Now</button>
    </div>
)
 
export default buildcontrols;