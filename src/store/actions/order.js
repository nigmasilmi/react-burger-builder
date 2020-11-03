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

export const purchaseBurgerStart = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseLoading())
        axiosInstance.post(`/orders.json?auth=${token}`, orderData)
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

export const fetchingOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axiosInstance.get(`/orders.json${queryParams}`)
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


