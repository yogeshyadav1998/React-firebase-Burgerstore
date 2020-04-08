import * as actiontype from './actiontypes';
import axios from './../../axiosorders';

export const initorderburger = () =>{
    return{
        type: actiontype.INIT_ORDER_BURGER
    }
}

export const orderburgersuccess = (orderdata, orderid) =>{
    return{
        type: actiontype.ORDER_BURGER_SUCCESS,
        orderid: orderid,
        orderdata: orderdata
    };
}

export const orderburgerfailed = () =>{
    return{
        type: actiontype.ORDER_BURGER_FAILED
    }
}

export const orderburgurstart = () =>{
    return{
        type: actiontype.ORDER_BURGER_START
    }
}

export const orderburger = (orderdata) =>{
    return dispatch =>{
        dispatch(orderburgurstart())
        axios.post('/orders.json', orderdata)
        .then(response =>{
            console.log(response.data)
            dispatch(orderburgersuccess(response.data.name, response.id))
        })
        .catch(error =>{
            dispatch(orderburgerfailed())
        })
    };
}
export const fetchordersstart = () =>{
    return{
        type: actiontype.FETCH_ORDERS_START
    }
}
export const fetchorderssuccess = (orders) =>{
    return {
        type: actiontype.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchordersfailed =( error ) =>{
    return {
        type: actiontype.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchorders =(error) =>{
    return dispatch =>{
        dispatch(fetchordersstart());
        axios.get('/orders.json')
        .then(res=>{
            const fetchedorders = [];
            for(let key in res.data){
                fetchedorders.push(
                    {...res.data[key],
                    id: key}
                )}
            dispatch(fetchorderssuccess(fetchedorders));
        })
        .catch(error =>{
            dispatch(fetchordersfailed(error));
        });
    }
}