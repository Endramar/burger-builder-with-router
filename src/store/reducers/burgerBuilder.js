import * as actionTypes from '../actions/actionTypes';
import utility from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredients = utility.updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 });
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building : true
            }
            return utility.updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredients2 = utility.updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 });
            const updatedState2 = {
                ingredients: updatedIngredients2,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building : true
            }
            return utility.updateObject(state, updatedState2);
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 4,
                building : false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}


export default reducer;