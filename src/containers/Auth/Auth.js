import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                    maxLength: 12
                },
                valid: false,
                touched: false

            },

        },
        isInSignUp: true,
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    controlValidation = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;

    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.controlValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isInSignUp);
    }


    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isInSignUp: !prevState.isInSignUp }
        })
    }
    render() {
        const formControlsArr = [];
        for (let key in this.state.controls) {
            formControlsArr.push({
                id: key,
                settings: this.state.controls[key]
            });
        }
        let formInputs = formControlsArr.map(formControl => (
            <Input
                key={formControl.id}
                elementType={formControl.settings.elementType}
                elementConfig={formControl.settings.elementConfig}
                value={formControl.settings.value}
                changed={(event) => this.inputChangeHandler(event, formControl.id)}
                shouldValidate={formControl.settings.validation}
                invalid={!formControl.settings.valid}
                didTouch={formControl.settings.touched}

            />
        ));

        let form = (<form onSubmit={this.onSubmitHandler}>
            {formInputs}
            <Button btnType="Success">
                Submit</Button>
        </form>);

        if (this.props.loading) {
            form = <Spinner />;
        }


        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.AuthData}>
                <h3>{this.state.isInSignUp ? 'You are about to register' : 'Welcome back, please sign in'}</h3>
                {authRedirect}
                {errorMessage}
                {form}
                <hr />
                <div className={classes.Special}>
                    <Button
                        btnType="Success"
                        clicked={this.switchAuthModeHandler}
                    >
                        Switch to {this.state.isInSignUp ? 'Sign in' : 'Sign up'}
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, isRegistered) => dispatch(actions.authenticating(email, pass, isRegistered)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));