import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import './styles.scss';
import img1 from '../assets/images/popup_img1.svg'

const ChangePasswordSuccess = ({ visible, setVisible}) => {
  const priceOrder = data && data.PriceOrder;
  const pairName = data && data.Pairname;
  const handleCloseModal = () => {
    setVisible(false);
  }
  return (
    <div>
      <Modal
        centered
        width={0}
        footer={null}
        visible={visible}
        closable
        onCancel={() => setVisible(false)}

      >
        <div className="popup">
          <div className="inner-profile">
            <h3 className="title-profile">SUCCESS</h3>
            <p className="desc">
              Your password has been changed successfully!
            </p>
            <div className="box-img">
              <svg width="156" height="156" viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink">
                <g clip-path="url(#clip0)">
                  <path
                    d="M97.3201 50.6328H91.4276V33.5468C91.4276 29.7695 89.9544 26.2189 87.2851 23.537C84.6158 20.8677 81.0652 19.3945 77.2753 19.3945C73.498 19.3945 69.9474 20.8677 67.2655 23.537C64.5962 26.2063 63.123 29.7569 63.123 33.5468V50.6454H57.2305V33.5468C57.2305 30.8397 57.7593 28.2208 58.8043 25.7404C59.8116 23.3481 61.2596 21.2076 63.0979 19.3694C64.9361 17.5311 67.0766 16.0831 69.4689 15.0758C71.9493 14.0308 74.5808 13.502 77.2753 13.502C79.9824 13.502 82.6013 14.0308 85.0817 15.0758C87.474 16.0831 89.6145 17.5311 91.4527 19.3694C93.291 21.2076 94.739 23.3481 95.7463 25.7404C96.7913 28.2082 97.3201 30.8397 97.3201 33.5468V50.6328Z"
                    fill="url(#paint0_linear)"/>
                  <path
                    d="M100.884 85.3841H53.6801C51.4641 85.3841 49.6636 83.5835 49.6636 81.3675V47.12C49.6636 44.904 51.4641 43.1035 53.6801 43.1035H100.884C103.1 43.1035 104.9 44.904 104.9 47.12V81.3675C104.9 83.5835 103.1 85.3841 100.884 85.3841Z"
                    fill="url(#paint1_linear)"/>
                  <rect x="75.3179" y="61.2949" width="3.89817" height="11.8758" fill="url(#pattern0)"/>
                  <path
                    d="M81.2239 62.9733C82.1415 60.7943 81.119 58.2841 78.94 57.3665C76.7611 56.4489 74.2509 57.4715 73.3333 59.6504C72.4157 61.8293 73.4383 64.3396 75.6172 65.2571C77.7961 66.1747 80.3063 65.1522 81.2239 62.9733Z"
                    fill="#262626"/>
                  <path d="M129.39 103.137H27V137.409H129.39V103.137Z" fill="#EDEDED"/>
                  <path d="M29.0522 139.537H127.338" stroke="#D4D4D4" stroke-width="31.161" stroke-miterlimit="10"
                        stroke-linecap="square"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M47.2993 114.555V128.397H44.8516V114.555H47.2993Z"
                        fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M52.6167 118.934L40.7912 126.109L39.5215 124.017L51.347 116.842L52.6167 118.934Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M40.7912 116.842L52.6167 124.017L51.347 126.109L39.5215 118.934L40.7912 116.842Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M68.4395 114.555V128.397H65.9917V114.555H68.4395Z"
                        fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M73.7568 118.934L61.9313 126.109L60.6616 124.017L72.4871 116.842L73.7568 118.934Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M61.9313 116.842L73.7568 124.017L72.4871 126.109L60.6616 118.934L61.9313 116.842Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M89.58 114.555V128.397H87.1323V114.555H89.58Z"
                        fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M94.8976 118.934L83.0854 126.11L81.8145 124.018L93.6267 116.842L94.8976 118.934Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M83.0854 116.842L94.8976 124.018L93.6267 126.11L81.8145 118.934L83.0854 116.842Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M110.72 114.555V128.397H108.272V114.555H110.72Z"
                        fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M116.05 118.934L104.225 126.109L102.955 124.017L114.781 116.842L116.05 118.934Z" fill="#666666"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M104.225 116.842L116.05 124.017L114.781 126.109L102.955 118.934L104.225 116.842Z" fill="#666666"/>
                </g>
                <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0"/>
                  </pattern>
                  <linearGradient id="paint0_linear" x1="57.2397" y1="32.0698" x2="97.3209" y2="32.0698"
                                  gradientUnits="userSpaceOnUse">
                    <stop stop-color="#999999"/>
                    <stop offset="0.6666" stop-color="#5D5D5D"/>
                    <stop offset="1" stop-color="#3D3D3D"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="44.4692" y1="31.4287" x2="96.3787" y2="83.3382"
                                  gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE887"/>
                    <stop offset="0.174" stop-color="#FDDF7B"/>
                    <stop offset="0.4853" stop-color="#F8C65D"/>
                    <stop offset="0.8953" stop-color="#EF9E2B"/>
                    <stop offset="1" stop-color="#ED931D"/>
                  </linearGradient>
                  <clipPath id="clip0">
                    <rect width="102.39" height="128" fill="white" transform="translate(27 13.502)"/>
                  </clipPath>
                  <image id="image0"
                         href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAAGMCAYAAAD0omFAAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA"/>
                </defs>
              </svg>
            </div>
            <p className="desc">
              You can now use your new password to log in your account.
            </p>
            <div className="box-input">
              <a href="#" className="btn-1 btn-save w-full">Save</a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ChangePasswordSuccess;
