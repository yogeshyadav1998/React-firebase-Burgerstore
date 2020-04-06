import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';


import Checkoutsummary from './../../components/Order/Checkoutsummary/Checkoutsummary';
import Contactdata from './Contactdata/Contactdata';

class checkout extends Component {

    checkoutcancelledhandler = () => {
        this.props.history.goBack();
    }
    checkoutcontinuedhandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return (
            <div>
            <Checkoutsummary ingredients={this.props.ingredients}
                             checkoutcancelled={this.checkoutcancelledhandler}
                             checkoutcontinued={this.checkoutcontinuedhandler}/>
            <Route path= {this.props.match.path + '/contact-data'} 
                           component={Contactdata}/>
            </div> 
        )
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.ingredients,
        totalprice: state.totalprice
    }
}

export default connect(mapStateToProps)(checkout);
