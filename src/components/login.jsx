import React from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { withRouter } from 'react-router-dom';

const login = (props) => {
  const signupWasClickedCallback = (data) => {
    if (!data.username.match(/^[6-9]\d{9}$/)) {
      toast.warn("enter valid mobile number", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else if (data.password !== data.passwordConfirmation) {
      toast.warn("Password and confirm password does not match", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      axios.post('http://localhost:4001/users/register', {
        username: data.username,
        password: data.password,
      })
        .then(function (response) {
          toast.success("Signed up successfully!!Please login now", {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch(function (error) {
          toast.success("Signed up failed!!", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    }

  };

  const loginWasClickedCallback = (data) => {
    if (!data.username || !data.password) {
      toast.warn("Please enter mobile number and password", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      axios.post('http://localhost:4001/users/authenticate', {
        username: data.username,
        password: data.password,
      })
        .then(function (response) {
          console.log(response);
          toast.success("Logged in successfully!!", {
            position: toast.POSITION.TOP_RIGHT
          });
          window.location.href = '/notes';
        })
        .catch(function (error) {
          toast.error("Cannot log in! Wrong username/password", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    }
  };

  const recoverPasswordWasClickedCallback = (data) => {
    console.log(data);
    alert('Recover password callback, see log on the console to see the data.');
  };

  return (
    <div >
      <ReactSignupLoginComponent
        styles={{
          flipper: { transition: '0.1s' },
          signup: {
            recoverPasswordButton: { dispaly: 'none' }
          },
          login: {
            recoverPasswordButton: { display: 'none' },
          }
        }}
        title="Social Notes"
        handleSignup={signupWasClickedCallback}
        handleLogin={loginWasClickedCallback}
        handleRecoverPassword={recoverPasswordWasClickedCallback}
        usernameCustomLabel="Mobile No."
        submitLoginCustomLabel="Log In"
      />
      <ToastContainer />
    </div>
  );
};

export default withRouter(login);