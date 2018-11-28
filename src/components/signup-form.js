import React from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser, registerDemo } from '../actions/users';
import { login } from '../actions/auth';
import { noEmail, noUser, noPass, noConfirm, isTrimmed, 
  userLength, passLength, matches, goodChars, goodEmail } from '../validators';
import { makeId } from '../actions/utils';
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

  handleDemo(){
    const username = `d3m0-${makeId()}`;
    const user = {
      username,
      email: 'demo@demo.com',
      password: 'password',
      confirmPwd: 'password',
      demo: true
    }
    return this.props.dispatch(registerDemo(user))
      .then(() => this.props.dispatch(login(username, 'password')));
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
      <main className="signup">
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
              validate={[noUser, isTrimmed, userLength, goodChars]}
            />
            <Field
              component={Input}
              label="Password *"
              type="password"
              name="password"
              id="password"
              validate={[noPass, isTrimmed, passLength]}
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
        </form>
        <section className="login-link">
          <p>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
          <p>
            Just want to give KanDo a test run?
            <button className="demo-login" onClick={() => this.handleDemo()}>
              Log in to a demo account
            </button>
            <em style={{fontSize: '0.8em'}}>(Demo account data not saved)</em>
          </p>
        </section>
      </main>
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
