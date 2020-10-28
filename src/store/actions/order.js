import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

// Purchasing

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData

    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        dispatch(purchaseLoading())
        axiosInstance.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));

            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));

            });
    }
}

export const purchaseLoading = () => {
    return {
        type: actionTypes.PURCHASE_LOADING,

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}


// Fetching Orders
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchingOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axiosInstance.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({ ...res.data[key], id: key })
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });

    }
}


