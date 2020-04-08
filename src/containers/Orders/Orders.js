import React, { Component } from 'react';
import axios from './../../axiosorders';
import {connect} from 'react-redux';

import Order from './../../components/Order/Order';
import witherrorhandler from './../../hoc/Witherrorhandler/Witherrorhandler';
import * as action from './../../store/actions/index'; 
import Spinner from '../../components/UI/Spinner/Spinner';

class orders extends Component {

    componentDidMount(){
        this.props.onfetchorders();
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

const mapStateTProps= state => {
    return {
        orders: this.state.order.orders,
        loading: this.state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onfetchorders: () => dispatch(action.fetchorders)
    }
}

export default connect(mapStateTProps ,mapDispatchToProps)(witherrorhandler(orders, axios));