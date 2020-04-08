import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to='/'/>
        if(this.props.ingredients){
            const purchaseredirect = this.props.purchased ?  <Redirect to='/'/> : null;
            summary=(
                <div>
                    {purchaseredirect}
                    <Checkoutsummary ingredients={this.props.ingredients}
                             checkoutcancelled={this.checkoutcancelledhandler}
                             checkoutcontinued={this.checkoutcontinuedhandler}/>
                    <Route path= {this.props.match.path + '/contact-data'} 
                           component={Contactdata}/>
                </div>
            )
        }
        return (
            <div>
                {summary}
            </div> 
        )
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerbuilder.ingredients,
        totalprice: state.burgerbuilder.totalprice,
        purchased: state.order.ordered
    }
}

export default connect(mapStateToProps)(checkout);
