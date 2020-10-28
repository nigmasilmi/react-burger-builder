import axiosInstance from '../../axios-orders';
import * as actionTypes from './actionTypes';


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName

    }

};

export const removeIngredient = (ingName) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName

    }
};

// synchronous function to execute once the async code is done

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INITIAL_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    // dispatch asynchronously, dispatch available due to redux thunk
    return dispatch => {
        axiosInstance.get('https://react-burgerbuilder-8d726.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })
    }
}