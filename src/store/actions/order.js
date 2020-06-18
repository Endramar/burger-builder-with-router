import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';


export const puchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(puchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(puchaseBurgerFail(error));
            });
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/orders.json' + query)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
            });
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

const puchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

const puchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
