import React, { useState } from 'react';
import RegisterForm from 'containers/Register/RegisterForm';

const Register = () => {
  return (
    <div className="login">
      <div className="login-inner">
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;