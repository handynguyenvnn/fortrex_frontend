import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import FloatLabel from '@components/FloatLabel';
import TextInput from '../TextInput';
import './style.less';

const CurrencyInput = ({
  value = 0,
  label = '',
  name = '',
  handleChange = () => {},
  extendClassName,
  disabled = false,
  displayType = '',
  suffix = ' VND',
  placeholder = '',
}) => (
  <div className="acb-currency-input-container">
    <FloatLabel label={label} name={name} value={value.value}>
      <NumberFormat
        className={clsx(['acb-custom-currency-input', extendClassName])}
        value={value}
        displayType={displayType}
        inputMode="numeric"
        decimalSeparator=","
        thousandSeparator="."
        suffix={suffix}
        onValueChange={handleChange}
        disabled={disabled}
        customInput={TextInput}
        placeholder={placeholder}
      />
    </FloatLabel>
  </div>
);
CurrencyInput.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  displayType: PropTypes.string,
  suffix: PropTypes.string,
  handleChange: PropTypes.func,
  extendClassName: PropTypes.array,
  placeholder: PropTypes.string,
};
export default CurrencyInput;
