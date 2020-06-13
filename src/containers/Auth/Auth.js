import React from 'react';


import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends React.Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: ''
            }
        },
        isSignUp: true
    }


    inputChangeHandler = (key, value) => {
        const updatedControls = { ...this.state.controls };
        const updatedInput = { ...updatedControls[key] };
        updatedInput.value = value;
        updatedControls[key] = updatedInput;
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    onSwitchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }

    render() {

        let inputArray = [];

        for (let key in this.state.controls) {
            inputArray.push(<Input
                key={key}
                elementType={this.state.controls[key].elementType}
                elementConfig={this.state.controls[key].elementConfig}
                value={this.state.controls[key].value}
                changed={(event) => this.inputChangeHandler(key, event.target.value)}
            />)
        }


        if (this.props.loading) {
            inputArray = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p style={{ color: 'red' }}>{this.props.error.message}</p>
        }

        return (
            <div className={classes.Auth}>
                <h3>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</h3>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {inputArray}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.onSwitchAuthModeHandler}>SWITCH TO {!this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => {
            dispatch(actions.auth(email, password, isSignUp))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);