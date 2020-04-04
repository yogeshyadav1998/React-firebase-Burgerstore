import React from 'react';

import classes from  './Order.css';

const order =(props)=>{
    const ingredients = [];
    for(let ingredientname in props.ingredients){
        ingredients.push(
        {
            name: ingredientname,
            amount: props.ingredients[ingredientname]
        });
    }
    const ingredientsoutput = ingredients.map(ig =>{
        return <span
            style={{textTransform:'capitalize',
                    display: 'inline-block',
                    border: '1px solid orange',
                    margin:'0 8px',
                    padding:'5px'}}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsoutput}</p>
            <p>Price: <strong> Rs {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order;