import * as actiontype from './actions';

const  initialstate = {
    ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalprice: 4
}

const ingredient_prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const reducer = (state = initialstate, action) =>{

    switch(action.type){
        case (actiontype.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientname]: state.ingredients[action.ingredientname] + 1
                },
                totalprice: state.totalprice + ingredient_prices[action.ingredientname]
            };
        
        case (actiontype.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientname]: state.ingredients[action.ingredientname] - 1
                },
                totalprice: state.totalprice - ingredient_prices[action.ingredientname]
            };

        default:
            return state;
    }

}

export default reducer;