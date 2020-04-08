import * as actiontype from './../actions/actiontypes';

const initialstate ={
    orders:[],
    loading: false,
    ordered: false
} 

const reducer = (state= initialstate, action) =>{
    switch(action.type){
        case actiontype.INIT_ORDER_BURGER:
            return{
                ...state,
                ordered: false
            }
        case actiontype.ORDER_BURGER_START:
            return{
                ...state,
                loading: true
            }
        case actiontype.ORDER_BURGER_SUCCESS:
            const neworder ={
                ingredients: action.orderdata.ingredients,
                orderdata: action.orderdata.orderdata,
                price: action.orderdata.price,
                id: action.orderid
            }
            return{
                ...state,
                loading: false,
                ordered: true,
                orders: state.orders.concat(neworder)
            }
        case actiontype.ORDER_BURGER_FAILED:
            return{
                ...state,
                loading: false
            }
        case actiontype.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actiontype.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actiontype.FETCH_ORDERS_FAILED:
            return{
                ...state,
                loading: true
            }
        default :
            return state
    }
}

export default reducer;