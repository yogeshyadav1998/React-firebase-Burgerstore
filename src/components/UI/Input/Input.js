import React from 'react';

import classes from './Input.css';

const input =(props)=>{

    let inputelement = null;

    switch(props.elementtype){
        case ('input'):
            inputelement = <input onChange={props.changed} className={classes.Inputelement} {...props.elementconfig}/>;
            break;
        case ('textarea'):
            inputelement = <input onChange={props.changed} className={classes.Inputelement} {...props}/>;
            break;
        case ('select'):
            inputelement = (
            <div>
            <label>Delivery:   </label>
            <select style={{width:"50%"}} onChange={props.changed} className = {classes.Inputelement} value = {props.value}>
                    {props.elementconfig.options.map(option =>(
                        <option key={option.value} value={option.value} >{option.displayvalue}</option>
                    ))}
            </select>
            </div>
            )
            break;
        default:
            inputelement = <input className={classes.Inputelement} {...props}/>;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputelement}
        </div>
    )


}

export default input;