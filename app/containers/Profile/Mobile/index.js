import React from "react";
import Profile from "./Profile";

import "./index.scss";

const Mobile = ({ ...rest }) => {
  return (
      <Profile {...rest} />
  );
};

export default Mobile;
