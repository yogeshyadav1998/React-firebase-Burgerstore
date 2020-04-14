import * as actiontype from '../actions/actiontypes';

const initialstate ={
    token: null,
    userid: null,
    loading: false,
}

const authreducer = (state= initialstate, action) =>{
    switch(action.type){
        case actiontype.AUTH_START:
            return{
                ...state,
                loading:true
            }
        case actiontype.AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                userid: action.userid,
                loading: false
            }
        case actiontype.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userid: null
            }
        default:
            return state
    }
}

export default authreducer;