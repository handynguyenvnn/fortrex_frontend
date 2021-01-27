import React, { useState } from 'react';
import { history } from '../../utils';
import { PAGE_PATHS } from 'constants/constant';
import {forgotPass, register, resetPassword} from "services";
import useKeypress, {openNotificationWithIcon} from "utils/utils";

const ForgotPassword = () => {
  const onClickLogin = () => {
    history.push(PAGE_PATHS.LOGIN);
  };

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    try {
      setLoading(true);
      const params = {
        Email: email
      };
      forgotPass({ params })
        .then(res => {
          if (res && res.data.StatusCode === 401) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
            return;
          } else if (res && res.data.StatusCode === 200) {
            history.push(PAGE_PATHS.RESET_PASSWORD_SUCCESS);
          } else {
            openNotificationWithIcon('error', 'Notification', "This Email don't exist !");
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  }
  useKeypress('Enter', () => {
    handleResetPassword().then();
  });


  return (
    <div>
      <div className="login">
        <div className="login-inner">
          <h3 className="title">FORGOT PASSWORD</h3>
          <p className="title-sub">Enter the email that you used for registering on the fotrex</p>
          <div className="login-form">
            <form>
              <div className="row">
                <input type="text" onChange={ item => { setEmail(item.target.value)}} name="email" placeholder="Enter email" />
              </div>
              <input className="btn success" className={`btn success ${loading ? 'disabled' : ''}`} disabled={loading} type="submit" onClick={ () => handleResetPassword()} name="submit" value="RESET PASSWORD" />
            </form>
          </div>
          <p className="txt txt-center mt-24">Back to <a onClick={onClickLogin}>Log in</a></p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
