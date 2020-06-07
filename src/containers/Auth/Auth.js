import React from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';


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
        }
    }


    inputChangeHandler = (key, value) => {
        const updatedControls = { ...this.state.controls };
        const updatedInput = { ...updatedControls[key] };
        updatedInput.value = value;
        updatedControls[key] = updatedInput;
        this.setState({ controls: updatedControls });
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

        return (
            <div className={classes.Auth}>
                <form>
                    {inputArray}
                    <Button btnType="Success">Sign In</Button>
                </form>
            </div>
        )
    }
}


export default Auth;