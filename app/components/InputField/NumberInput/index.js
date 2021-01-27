import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
// import FloatLabel from '@components/FloatLabel';
import TextInput from '@components/InputField/TextInput';
import './style.less';

const NumberInput = ({
  value = '',
  // label = '',
  // name = '',
  onChange = () => {},
  format = null,
  extendClassName,
  placeholder = '',
  disabled,
  maxLength,
  inputMode = 'numeric',
  allowNegative = false,
  readOnly,
  inputSuffix,
  maxValue
}) => {
  const isAllowed = maxValue
    ? ({ floatValue }) => !floatValue || floatValue <= maxValue
    : undefined;
  return (
    <div className={clsx(['acb-number-input-container', extendClassName])}>
      {/* <FloatLabel label={label} name={name} value={value.value}> */}
      <NumberFormat
        value={value}
        format={format}
        onChange={onChange}
        inputSuffix={inputSuffix}
        customInput={TextInput}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        inputMode={inputMode}
        allowNegative={allowNegative}
        isAllowed={isAllowed}
      />
      {/* </FloatLabel> */}
    </div>
  );
};

NumberInput.propTypes = {
  value: PropTypes.any,
  // label: PropTypes.string,
  // name: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.string,
  extendClassName: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  inputMode: PropTypes.string,
  allowNegative: PropTypes.bool,
  inputSuffix: PropTypes.string,
  maxValue: PropTypes.number,
};
export default NumberInput;
