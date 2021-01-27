import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const P = styled.p`
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
`;

export default function SectionTitle({ text, ...props }) {
  return <P {...props}>{text}</P>;
}

SectionTitle.propTypes = {
  text: PropTypes.string,
};
