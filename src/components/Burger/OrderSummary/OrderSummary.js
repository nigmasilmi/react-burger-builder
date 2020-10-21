import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('updated');
    }

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span> : {this.props.ingredients[ingKey]}
                    </li>
                )
            })

        return (

            <Aux>
                <h3>Your Order</h3>
                <p>Your Burger will contain:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: $ {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchaseConfirmed} btnType='Success'>CONTINUE</Button>

            </Aux>
        )
    }

}

export default OrderSummary;