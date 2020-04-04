import React, { Component } from 'react';
import axios from '../../../axiosorders';

import Button from './../../../components/UI/Button/Button';
import classes from './Contactdata.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';

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
                        required:true
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
            },
        loading:false
    }

    orderhandler =(event) =>{
        event.preventDefault();
        this.setState({loading:true})
                const formdata = {};
                for(let formElementIdentifier in this.state.orderform){
                    formdata[formElementIdentifier]=this.state.orderform[formElementIdentifier];
                };
                console.log(formdata);
                const order ={
                    ingredients: this.props.ingredients,
                    price: this.props.price,
                    orderdata: formdata
                }
                axios.post('/orders.json', order)
                    .then(response =>{
                        console.log(response)
                        this.setState({loading:false});
                        this.props.history.push('/');
                    })
                    .catch(error =>{
                        console.log(error);
                        this.setState({loading:false});

                    }); 
    }

    checkvalidity(value, rule){
        let isvalid = false;

        if(rule.requires){
            isvalid = value.trim() !== '' 
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

export default contactdata;