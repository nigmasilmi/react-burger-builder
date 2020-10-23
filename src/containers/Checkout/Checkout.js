import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: { salad: 1 },
        totalPrice: 0
    }


    checkOutCancelledHandler = () => {
        // volver a burgerbuilder
        this.props.history.goBack();

    }

    checkoutContinuedHandler = () => {
        //mostrar formulario para agregar otros datos
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount() {
        const ingredients = {};
        let price = 0;
        const query = new URLSearchParams(this.props.location.search);
        for (let entry of query.entries()) {
            if (entry[0] === 'price') {
                price = entry[1];
            } else {
                ingredients[entry[0]] = +entry[1];

            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkOutCancelledHandler}
                    ingredients={this.state.ingredients}>
                </CheckoutSummary>
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}
                />


            </div>
        )
    }
}
export default Checkout;
