import React from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import { noEmail, noUser, noPass, noConfirm, isTrimmed, 
  userLength, passLength, matches, goodChars, goodEmail } from '../validators';
import Input from './input';
import './signup-form.css';
const matchesPassword = matches('password');

export class SignupForm extends React.Component {
  onSubmit(values){
    const { username, email, password, confirmPwd } = values;
    const user = { username, email, password, confirmPwd }
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(values.username, values.password)));
  }
  
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/board" />;
    }
    let error;
    if (this.props.error) {
      error = (this.props.error);
    } else {
      error = '* Required'
    }
    return (
      <form
        className="signup-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <fieldset>
          <legend><h2>Sign up</h2></legend>
          <div className="form-error" aria-live="polite">
            {error}
          </div>
          <Field
            component={Input}
            label="Email *"
            type="text"
            name="email"
            id="email"
            validate={[noEmail, goodEmail]}
          />
          <Field
            component={Input}
            label="Username *"
            type="text"
            name="username"
            id="username"
            validate={[noUser, userLength, goodChars, isTrimmed]}
          />
          <Field
            component={Input}
            label="Password *"
            type="password"
            name="password"
            id="password"
            validate={[noPass, passLength, isTrimmed]}
          />
          <Field
            component={Input}
            label="Confirm Password *"
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            validate={[noConfirm, matchesPassword]}
          />
          <button disabled={!this.props.valid || this.props.submitting}>
            Create Account
          </button>
        </fieldset>
        <p className="login-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

SignupForm = connect(mapStateToProps)(SignupForm);

export default reduxForm({
  form: 'signup',
  onSubmitFail: (errors, dispatch) => dispatch(focus('signup', Object.keys(errors)[0]))
})(SignupForm);
