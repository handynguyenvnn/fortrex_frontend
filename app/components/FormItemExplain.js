import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  text-align: end;
  font-size: 12px;
  margin-top: -12px;
  color: grey;
`;
export default function FormItemExplain({ text }) {
  return <Div>{text}</Div>;
}

FormItemExplain.propTypes = {
  text: PropTypes.string,
};
