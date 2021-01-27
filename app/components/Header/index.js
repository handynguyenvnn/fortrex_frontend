import React, { useState } from "react";
import { PAGE_PATHS } from "constants/constant";
import { useMedia } from "hooks/useMedia";
import { _getCookie, _removeCookie } from "components/common/helpers";
import Transfer from "components/Modal/Transfer";
import { router } from "../../utils";

import { isMobile } from "react-device-detect";
import Web from "./Web";
import Mobile from "./Mobile";

const HeaderComponent = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useMedia();

  const userName = _getCookie("username");
  const email = _getCookie("email");
  const fullName = _getCookie("fullName");
  const [visibleTransfer, setVisibleTransfer] = useState(false);
  const onClickTransfer = () => {
    setVisibleTransfer(true);
  };
  const redirectDeposit = () => {
    window.location.pathname = "/wallet";
  };
  const handleLogout = () => {
    _removeCookie("token");
    _removeCookie("username");
    _removeCookie("access_token");
    _removeCookie("fullName");
    _removeCookie("email");
    window.location.pathname = "/login";
  };
  // if ( (window.location.pathname == "/agency" || window.location.pathname == "/network")  && isMobile == true){
  //   return (
  //       <div></div>
  //   )
  // }
  return (
    <div>
      {isDesktopOrLaptop && (
        <Web
          userName={userName}
          email={email}
          fullName={fullName}
          visibleTransfer={visibleTransfer}
          setVisibleTransfer={setVisibleTransfer}
          redirectDeposit={redirectDeposit}
          handleLogout={handleLogout}
        />
      )}
      {isTabletOrMobile && (
        <div className="mobile-trading">
          <Mobile handleLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
