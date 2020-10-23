import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axiosInstance.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({ ...res.data[key], id: key })
                }

                this.setState({ orders: fetchOrders, loading: false })
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });



    }

    render() {


        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        price={order.price}
                        ingredients={order.ingredients}

                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axiosInstance);