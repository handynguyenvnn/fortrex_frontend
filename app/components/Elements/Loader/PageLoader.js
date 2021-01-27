import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageLoaderStyle = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(153, 153, 153, 0.73);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /*
  * bootstrap 4.0 spinner
  */
  @-webkit-keyframes spinner-border {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-border {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .spinner-border {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border 0.75s linear infinite;
    animation: spinner-border 0.75s linear infinite;
  }

  .spinner-border-sm {
    height: 1rem;
    border-width: 0.2em;
  }
`;
export const PageLoader = ({ msg }) => (
  <PageLoaderStyle id="page-loader-id">
    <div
      className="spinner-border"
      style={{ width: '3rem', height: '3rem' }}
      role="status"
    >
      <span className="sr-only">{msg}</span>
    </div>
  </PageLoaderStyle>
);

PageLoader.propTypes = {
  msg: PropTypes.string,
};

PageLoader.defaultProps = {
  msg: '',
};
