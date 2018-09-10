import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';
import {required, nonEmpty} from '../validators';
import Input from './input';
import './login-form.css';

export class LoginForm extends React.Component {
  onSubmit(values){
    // return this.props.dispatch(login(values.username, values.password));
  }
  
  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <fieldset>
          <legend><h2>Login</h2></legend>
          {error}
          <Field
            component={Input}
            label="Username"
            type="text"
            name="username"
            id="username"
            validate={[required, nonEmpty]}
          />
          <Field
            component={Input}
            label="Password"
            type="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
          />
          <button disabled={this.props.pristine || this.props.submitting}>
            Log in
          </button>
        </fieldset>
        <p className="signup-link">
          New user? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
