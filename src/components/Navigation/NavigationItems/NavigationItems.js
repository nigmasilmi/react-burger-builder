import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let authenticateLink = <NavigationItem link="/logout">Log out</NavigationItem>;
    if (!props.isAuth) {
        authenticateLink = <NavigationItem link="/auth">Authenticate</NavigationItem>;
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {authenticateLink}
        </ul>
    )
};

export default navigationItems;
