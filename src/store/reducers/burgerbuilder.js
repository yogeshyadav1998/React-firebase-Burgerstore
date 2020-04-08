import * as actiontype from '../actions/actiontypes';

const  initialstate = {
    ingredients: null,
    totalprice: 4,
    error: false
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
        
        case (actiontype.SET_INGREDIENTS):
            return{
                ...state,
                ingredients:{
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalprice: 4,
                error: false
            };

        case (actiontype.FETCH_INGREDIENTS_FAILED):
            return{
                ...state,
                error: true
            }

        default:
            return state;
    }

}

export default reducer;