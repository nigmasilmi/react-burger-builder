import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' }

];

const buildControls = (props) => {
    const price = props.price;
    const ableToPurchase = props.purchaseable;

    return (
        <div className={classes.BuildControls}>
            <p>Price: $ <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    key={ctrl.label}
                    label={ctrl.label}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!ableToPurchase}
                onClick={props.ordered}
            >Order Now</button>
        </div>
    )

};



export default buildControls;