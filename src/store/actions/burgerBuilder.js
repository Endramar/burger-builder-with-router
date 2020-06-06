import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const initIngredients = () => {
    return dispach => {
        axios.get('/ingredients.json')
            .then(response => {
                dispach(setIngredients(response.data));
            })
            .catch(error => {
                dispach(fetchIngredientFailed());
            });
    }
}


const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}