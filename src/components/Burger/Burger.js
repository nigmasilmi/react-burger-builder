import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transfIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])]
                .map((_, index) => <BurgerIngredient type={ingKey} key={ingKey + index} />);
        }).reduce((accum, next) => { return accum.concat(next) }, []);
    if (transfIngredients.length === 0) {
        transfIngredients = <p>Add Ingredients to your Burger</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

};

export default burger;