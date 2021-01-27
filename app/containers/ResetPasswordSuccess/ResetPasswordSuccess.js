import React, { useState } from 'react';
import { history } from '../../utils';
import { PAGE_PATHS } from 'constants/constant';

const ResetPasswordSuccess = () => {

  const onClickLogin = () => {
    history.push(PAGE_PATHS.LOGIN);
  };

  return (
    <div>
      <div className="login">
        <div className="login-inner">
          <h3 className="title">SUCCESS</h3>
          <p className="title-sub">Your password has been reset successfully!</p>
          <div className="img">
            <svg width="103" height="129" viewBox="0 0 103 129" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <path
                  d="M70.3201 37.6325H64.4276V20.5466C64.4276 16.7693 62.9544 13.2186 60.2851 10.5367C57.6158 7.86744 54.0652 6.39429 50.2753 6.39429C46.498 6.39429 42.9474 7.86744 40.2655 10.5367C37.5962 13.206 36.123 16.7567 36.123 20.5466V37.6451H30.2305V20.5466C30.2305 17.8395 30.7593 15.2206 31.8043 12.7402C32.8116 10.3479 34.2596 8.2074 36.0979 6.36911C37.9361 4.53083 40.0766 3.08286 42.4689 2.07558C44.9493 1.03053 47.5808 0.501709 50.2753 0.501709C52.9824 0.501709 55.6013 1.03053 58.0817 2.07558C60.474 3.08286 62.6145 4.53083 64.4527 6.36911C66.291 8.2074 67.739 10.3479 68.7463 12.7402C69.7913 15.208 70.3201 17.8395 70.3201 20.5466V37.6325Z"
                  fill="url(#paint0_linear)" />
                <path
                  d="M73.8842 72.3836H26.6806C24.4646 72.3836 22.6641 70.5831 22.6641 68.367V34.1196C22.6641 31.9035 24.4646 30.103 26.6806 30.103H73.8842C76.1002 30.103 77.9007 31.9035 77.9007 34.1196V68.367C77.9007 70.5831 76.1002 72.3836 73.8842 72.3836Z"
                  fill="url(#paint1_linear)" />
                <rect x="48.3184" y="48.2952" width="3.89817" height="11.8758" fill="url(#pattern0)" />
                <path
                  d="M54.2239 49.973C55.1415 47.7941 54.119 45.2839 51.94 44.3663C49.7611 43.4487 47.2509 44.4712 46.3333 46.6501C45.4157 48.8291 46.4383 51.3393 48.6172 52.2569C50.7961 53.1745 53.3063 52.1519 54.2239 49.973Z"
                  fill="#262626" />
                <path d="M102.39 90.137H0V124.41H102.39V90.137Z" fill="#EDEDED" />
                <path d="M2.05273 126.538H100.338" stroke="#D4D4D4" stroke-width="31.161" stroke-miterlimit="10" stroke-linecap="square" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2993 101.554V115.397H17.8516V101.554H20.2993Z" fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.6167 105.935L13.7912 113.11L12.5215 111.017L24.347 103.842L25.6167 105.935Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7912 103.842L25.6167 111.017L24.347 113.11L12.5215 105.935L13.7912 103.842Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.4399 101.554V115.397H38.9922V101.554H41.4399Z" fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M46.7573 105.935L34.9318 113.11L33.6621 111.017L45.4876 103.842L46.7573 105.935Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M34.9318 103.842L46.7573 111.017L45.4876 113.11L33.6621 105.935L34.9318 103.842Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M62.5805 101.554V115.397H60.1328V101.554H62.5805Z" fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M67.8976 105.934L56.0854 113.11L54.8145 111.018L66.6267 103.842L67.8976 105.934Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M56.0854 103.842L67.8976 111.018L66.6267 113.11L54.8145 105.934L56.0854 103.842Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M83.7212 101.554V115.397H81.2734V101.554H83.7212Z" fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M89.0503 105.935L77.2248 113.11L75.9551 111.017L87.7806 103.842L89.0503 105.935Z"
                      fill="#666666" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M77.2248 103.842L89.0503 111.017L87.7806 113.11L75.9551 105.935L77.2248 103.842Z"
                      fill="#666666" />
              </g>
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use href="#image0" />
                </pattern>
                <linearGradient id="paint0_linear" x1="30.2397" y1="19.0696" x2="70.3209" y2="19.0696" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#999999" />
                  <stop offset="0.6666" stop-color="#5D5D5D" />
                  <stop offset="1" stop-color="#3D3D3D" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="17.4696" y1="18.4282" x2="69.3792" y2="70.3377" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFE887" />
                  <stop offset="0.174" stop-color="#FDDF7B" />
                  <stop offset="0.4853" stop-color="#F8C65D" />
                  <stop offset="0.8953" stop-color="#EF9E2B" />
                  <stop offset="1" stop-color="#ED931D" />
                </linearGradient>
                <clipPath id="clip0">
                  <rect width="102.39" height="128" fill="white" transform="translate(0 0.501709)" />
                </clipPath>
                <image id="image0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAAGMCAYAAAD0omFAAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA" />
              </defs>
            </svg>
          </div>
          <p className="txt1">You can now use your new password to log in your account.</p>
          <a className="btn success" onClick={onClickLogin}>LOG IN</a>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordSuccess;