import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest'
            },
        }
    }

    orderHandler = (event) => {
        // This is to prevent reloding the of page!!!
        event.preventDefault();

        let orderData = {};
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: orderData
        }

        this.props.onOrderBurger(order);
    }


    inputChangeHandler = (key, value) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedInput = { ...updatedOrderForm[key] };
        updatedInput.value = value;

        updatedOrderForm[key] = updatedInput;

        this.setState({ orderForm: updatedOrderForm });
    }

    render() {

        let inputArray = [];

        for (let key in this.state.orderForm) {
            inputArray.push(<Input
                key={key}
                elementType={this.state.orderForm[key].elementType}
                elementConfig={this.state.orderForm[key].elementConfig}
                value={this.state.orderForm[key].value}
                changed={(event) => this.inputChangeHandler(key, event.target.value)}
            />)
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputArray}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        ings: state.burgerBuilderingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.puchaseBurger(orderData))
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(ContactData, axios));