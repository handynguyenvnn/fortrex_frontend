import React, { useState } from 'react';
import { history } from '../../utils';
import { PAGE_PATHS } from 'constants/constant';

const RegisterSuccess = () => {
  const onClickLogin = () => {
    history.push(PAGE_PATHS.LOGIN);
  };
  return (
    <div>
      <h3 className="title">SUCCESS</h3>
      <p className="title-sub">Thank you for joining with us!</p>
      <div className="img">
        <svg width="156" height="126" viewBox="0 0 156 126" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 59.9714L33.0596 86.574L156 50.6733L0 59.9714Z" fill="#57CAFF" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M29.702 124.541L33.0596 86.574L156 50.6733L50.8808 98.7131L29.702 124.541Z" fill="#0092D6" />
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M119.583 13.2232L52.4305 36.7265C46.7484 38.7927 41.8411 45.7662 41.3246 52.4814L39.5166 93.0311C39.2583 99.7463 43.6491 103.362 49.5895 101.296L116.742 77.7927C122.424 75.7265 127.589 68.753 127.848 62.0377L129.656 21.4881C129.914 15.0311 125.523 11.1569 119.583 13.2232Z"
                fill="#00AEFF" />
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M120.099 12.9642L52.1721 36.984C49.0728 38.0171 45.9734 40.8582 44.1655 44.2158L84.7151 59.7125L127.589 14.7721C125.781 12.7059 123.199 11.931 120.099 12.9642Z"
                fill="#00BFFF" />
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M128.364 1.60019C136.113 -1.24087 142.311 4.18297 141.795 13.481C141.278 22.779 134.821 32.5936 126.815 35.4346C118.808 38.2757 112.868 32.8518 113.126 23.5538C113.901 13.9975 120.616 4.18297 128.364 1.60019Z"
                fill="#FF0000" />
          <path
            d="M129.139 26.653L126.298 27.6861L126.815 14.7722C125.781 16.3219 124.49 17.6132 122.94 18.6464V15.547C125.265 13.9973 126.556 11.9311 127.331 9.60662L129.656 8.83179L129.139 26.653Z"
            fill="white" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M29.702 124.54L62.245 106.978L50.8808 98.7126L29.702 124.54Z" fill="#006FA3" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M50.8807 98.7131L62.245 106.978L86.5231 125.057L156 50.6733L50.8807 98.7131Z" fill="#57CAFF" />
        </svg>
      </div>
      <p className="txt1">An email has already sent to your email. Please check your email for activating your account.</p>
      {/*<a className="btn success" onClick={onClickLogin}>LOG IN</a>*/}
    </div>
  );
};
export default RegisterSuccess;