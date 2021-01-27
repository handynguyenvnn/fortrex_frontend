import React, { useState } from 'react';
import RegisterSuccess from 'containers/SuccessRegister/RegisterSuccess';

const SuccessRegister = () => {
  return (
    <div className="login">
      <div className="login-inner">
        <RegisterSuccess />
      </div>
    </div>
  );
};
export default SuccessRegister;