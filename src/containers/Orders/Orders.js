import React, { Component } from 'react';
import axios from './../../axiosorders';

import Order from './../../components/Order/Order';
import witherrorhandler from './../../hoc/Witherrorhandler/Witherrorhandler';

class orders extends Component {
    state={
        orders:[],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            const fetchedorders = [];
            for(let key in res.data){
                fetchedorders.push(
                    {...res.data[key],
                    id: key}
                )}
            this.setState({loading: false, orders: fetchedorders});
        })
        .catch(err=>{
            this.setState({loading:false});
        });
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order=> (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
            </div>
        )
    }
}

export default witherrorhandler(orders, axios);