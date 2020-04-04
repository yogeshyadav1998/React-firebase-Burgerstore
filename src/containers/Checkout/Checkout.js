import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import Checkoutsummary from './../../components/Order/Checkoutsummary/Checkoutsummary';
import Contactdata from './Contactdata/Contactdata';

class checkout extends Component {
    state ={
        ingredients:null,
        price:0
    }

    componentWillMount() {
        const string = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price =0;
        for(let param of string.entries()){
            if(param[0] === 'price'){
                price =param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalprice: price});
    }

    checkoutcancelledhandler = () => {
        this.props.history.goBack();
    }
    checkoutcontinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return (
            <div>
            <Checkoutsummary ingredients={this.state.ingredients}
                             checkoutcancelled={this.checkoutcancelledhandler}
                             checkoutcontinued={this.checkoutcontinuedhandler}/>
            <Route path= {this.props.match.path + '/contact-data'} 
                            render={(props)=>(<Contactdata ingredients={this.state.ingredients} price={this.state.totalprice} {...props}/>)}/>
            </div> 
        )
    }
}

export default checkout;
