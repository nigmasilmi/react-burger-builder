import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import axiosInstance from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axiosInstance.get('https://react-burgerbuilder-8d726.firebaseio.com/ingredients.json')
            .then(res => {
                console.log(res);
                this.setState({ ingredients: res.data })
            })
            .catch(error => { this.setState({ error: true }) })
    }

    updatePurchaseState(ingredients) {
        const ingredientsSum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: ingredientsSum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) { return }

        let updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })

    }
    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            costomer: {
                name: 'Juana de Arco',
                address: {
                    city: 'Orleans',
                    zipcode: '379',
                    country: 'France'
                },
                email: 'juanita@email.com'

            },
            deliveryMethod: 'fastest'
        }
        axiosInstance.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });

            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });

            });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }

        let orderSummary = null;

        if (this.state.loading || !this.state.ingredients) {
            orderSummary = <Spinner />;
        }


        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.state.ingredients}
                    />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}

                    />
                </Aux>);

            orderSummary =
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseConfirmed={this.purchaseContinueHandler}
                    price={this.state.totalPrice}

                />;

        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);