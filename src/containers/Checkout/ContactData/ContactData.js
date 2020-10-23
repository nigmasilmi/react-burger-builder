import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axiosInstance from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        address: {
            street: '',
            zipcode: '',
        },
        email: '',
        loading: false

    }

    componentDidMount() {
        console.log(this.props);
    }

    orderHandler = (event) => {
        // this.props.history.replace('/checkout/contact-data');
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
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
                this.setState({ loading: false });
                this.props.history.push('/');

            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });

            });

    }
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name"></input>
                <input className={classes.Input} type="email" name="email" placeholder="your email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="your street"></input>
                <input className={classes.Input} type="text" name="zipcode" placeholder="your area zipcode"></input>
                <Button clicked={this.orderHandler} btnType="Success">Process the Order</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your delivery information</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;