import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import clsx from 'clsx';
import FloatLabel from '@components/FloatLabel';
import './style.less';

const TextInput = ({
  label = '',
  name = '',
  value = '',
  onChange = () => {},
  prefix,
  extendClassName,
  placeholder = '',
  // hasSuffixIcon = false,
  inputSuffix: suffix,
  maxLength,
  ...props
}) => (
  <div className="acb-text-input-container">
    <FloatLabel label={label} name={name} value={value}>
      <Input
        className={clsx(['acb-custom-text-input', extendClassName])}
        prefix={prefix}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        suffix={suffix}
        {...props}
      />
    </FloatLabel>
  </div>
);
TextInput.propTypes = {
  props: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefix: PropTypes.object,
  extendClassName: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputSuffix: PropTypes.any,
  maxLength: PropTypes.number,
};
export default TextInput;
