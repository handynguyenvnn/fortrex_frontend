import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import clsx from 'clsx';
import FloatLabel from '@components/FloatLabel';
import './style.less';

const PasswordInput = ({
  value = '',
  label = '',
  name = '',
  extendClassName,
  onChange = () => {},
  prefix,
}) => (
  <div className="acb-password-input-container">
    <FloatLabel label={label} name={name} value={value}>
      <Input.Password
        className={clsx(['acb-custom-password-input', extendClassName])}
        onChange={onChange}
        value={value}
        prefix={prefix}
        placeholder="Please Enter..."
      />
    </FloatLabel>
  </div>
);
PasswordInput.propTypes = {
  prefix: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  extendClassName: PropTypes.array,
  onChange: PropTypes.func,
};
export default PasswordInput;
