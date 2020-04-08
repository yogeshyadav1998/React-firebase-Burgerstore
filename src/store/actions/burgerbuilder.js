import * as actiontype from './actiontypes';
import axios from '../../axiosorders';

export const addingredient = (ingredientname) =>{
    return{
        type: actiontype.ADD_INGREDIENT,
        ingredientname: ingredientname
    }
}

export const removeingredient = (ingredientname) =>{
    return{
        type: actiontype.REMOVE_INGREDIENT,
        ingredientname: ingredientname
    }
}

export const setingredients = (ingredients) =>{
    return{
        type: actiontype.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchingredientsfailed = () =>{
    return{
        type: actiontype.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchingredients = () =>{
    return dispatch =>{ 
        axios.get('/ingredients.json')
        .then(response =>{
            dispatch(setingredients(response.data));
        })
        .catch(error=>{
            dispatch(fetchingredientsfailed());
        })
    }
}