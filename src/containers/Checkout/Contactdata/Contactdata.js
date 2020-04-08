import React, { Component } from 'react';
import axios from '../../../axiosorders';
import {connect} from 'react-redux';

import Button from './../../../components/UI/Button/Button';
import classes from './Contactdata.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import witherrorhandler from './../../../hoc/Witherrorhandler/Witherrorhandler';
import * as orderaction from './../../../store/actions/index';

class contactdata extends Component{
    state ={
        orderform:{
                name:{
                    elementtype: 'input',
                    elementconfig: {
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                contact:{
                    elementtype: 'input',
                    elementconfig: {
                        type:'text',
                        placeholder:'Your Contact Number'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                street:{
                    elementtype: 'input',
                    elementconfig: {
                        type:'text',
                        placeholder:'Street Number/Name'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                city:{
                    elementtype: 'input',
                    elementconfig: {
                        type:'text',
                        placeholder:'City'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                pincode:{
                    elementtype: 'input',
                    elementconfig: {
                        type:'text',
                        placeholder:'Pin Code'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLength: 6,
                        maxLength: 6
                    },
                    valid: false
                },
                email:{
                    elementtype: 'input',
                    elementconfig: {
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid: false
                },
                delivery:{
                    elementtype: 'select',
                    elementconfig: {
                        options:[
                            {value:'fastest', displayvalue: 'Fastest'},
                            {value:'cheapest', displayvalue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
            }
    }

    orderhandler =(event) =>{
        event.preventDefault();
        const formdata = {};
        for(let formElementIdentifier in this.state.orderform){
            formdata[formElementIdentifier]=this.state.orderform[formElementIdentifier];
        };
        console.log(formdata);
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.totalprice,
            orderdata: formdata
        }
        
        this.props.onorderburger(order);
    }

    checkvalidity(value, rules){
        let isvalid = false;

        if(!rules){
            return true;
        }

        if(rules.requires){
            isvalid = value.trim() !== '' && isvalid
        }

        if(rules.minLength){
            isvalid = value.length >= rules.minLength && isvalid
        }

        if(rules.maxLength){
            isvalid = value.lenght <= rules.maxLength && isvalid 
        }

        return isvalid;
    }

    onchangehandler = (event, inputIdentifier) =>{
        const updatedform = {
            ...this.state.orderform
        };
        const updatedformelement = {
            ...updatedform[inputIdentifier]
        };
        updatedformelement.value = event.target.value;
        updatedformelement.valid = this.checkvalidity(updatedformelement.value, updatedformelement.validation);
        updatedform[inputIdentifier]=updatedformelement;
        this.setState({orderform: updatedform});
    }

    render(){
        const formelementarray = [];
        for(let key in this.state.orderform){
            formelementarray.push({
                id: key,
                config: this.state.orderform[key]
            })
        }
        let form = (
            <form onSubmit={this.orderhandler}>
                {formelementarray.map(formelement =>(
                    <Input
                        key = {formelement.id}
                        elementtype = {formelement.config.elementtype}
                        elementconfig = {formelement.config.elementconfig}
                        value = {formelement.value}
                        changed= {(event) => this.onchangehandler(event , formelement.id)}
                    />
                ))}
                <Button btntype="Success">Order</Button>
            </form>
                
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.Contactdata}>
            <h3>Contact Details-</h3>
            {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerbuilder.ingredients,
        totalprice: state.burgerbuilder.totalprice
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onorderburger: (orderdata) =>dispatch(orderaction.orderburger(orderdata))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(witherrorhandler(contactdata, axios));