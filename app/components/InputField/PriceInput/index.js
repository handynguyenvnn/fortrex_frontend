import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextInput from '../TextInput';

const Div = styled.div`
  // background-color: #f4f4f4;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
  &.disabled {
    background-color: #f5f5f5;
  }
  .acb-custom-text-input {
    background-color: transparent;
    .ant-input {
      background-color: transparent;
      font-size: 1rem;
    }
  }
`;

export default function PriceInput({
  suffix = 'VND',
  onChange,
  isCurrency = true,
  placeholder,
  maxValue = 1000000000,
  // minValue = 0,
  ...props
}) {
  const customProp = isCurrency
    ? { decimalSeparator: ',', thousandSeparator: '.' }
    : {};

  const isAllowed = maxValue
    ? ({ floatValue }) => !floatValue || floatValue <= maxValue
    : undefined;

  const onValueChange = ({ value }) => {
    onChange(value);
  };

  return (
    <Div className={props.disabled ? 'disabled' : ''}>
      <NumberFormat
        inputMode="numeric"
        allowNegative={false}
        onValueChange={onValueChange}
        inputSuffix={suffix}
        customInput={TextInput}
        placeholder={placeholder}
        {...customProp}
        {...props}
        isAllowed={isAllowed}
      />
    </Div>
  );
}

PriceInput.propTypes = {
  suffix: PropTypes.string,
  onChange: PropTypes.func,
  isCurrency: PropTypes.bool,
  placeholder: PropTypes.string,
  maxValue: PropTypes.number,
  // minValue: PropTypes.number,
  disabled: PropTypes.bool,
};
