import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
//Use recompose to simply the stucture of higher-order components
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
 
//Create the initial state of the sign up to hold the values.
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    //assign the initial state
    this.state = { ...INITIAL_STATE };
  }
 
  //handle onSubmit event
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    //call create user function to create a user with email and password
    this.props.firebase
      .createUser(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        //if user created, then set the states
        this.setState({ ...INITIAL_STATE });
        //redirct the new user to HOME page
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        //catch the error and set in the state.
        this.setState({ error });
      });
 
    //prevents browser reload when submit
    event.preventDefault();
  };
 
  onChange = event => {
    //handle the onChange event inside the form, like name change, email change, etc..
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //validations to check if the passwords are matched, email and username is not empty
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };