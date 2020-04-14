import React, { Component } from 'react';
import axios from './../../axiosorders';
import {connect} from 'react-redux';

import Order from './../../components/Order/Order';
import witherrorhandler from './../../hoc/Witherrorhandler/Witherrorhandler';
import * as action from './../../store/actions/index'; 
import Spinner from '../../components/UI/Spinner/Spinner';

class orders extends Component {

    componentDidMount(){
        this.props.onfetchorders(this.props.token);
    }

    render(){
        let orders = <Spinner/>
        if(!this.props.loading){
            orders = this.props.orders.map(order=> (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            ))
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateT0Props= state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onfetchorders: (token) => dispatch(action.fetchorders(token))
    }
}

export default connect(mapStateT0Props ,mapDispatchToProps)(witherrorhandler(orders, axios));