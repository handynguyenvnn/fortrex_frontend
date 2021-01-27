import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import clsx from 'clsx';
import FloatLabel from '@components/FloatLabel';
import './style.less';

const TextAreaInput = ({
  label = '',
  name = '',
  value = '',
  onChange = () => {},
  props,
  rows = 4,
  extendClassName,
  placeholder = '',
}) => (
  <div className="acb-text-area-input-container">
    <FloatLabel label={label} name={name} value={value}>
      <Input.TextArea
        className={clsx(['acb-custom-text-area-input', extendClassName])}
        {...props}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FloatLabel>
  </div>
);
TextAreaInput.propTypes = {
  props: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  extendClassName: PropTypes.array,
  rows: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
export default TextAreaInput;
