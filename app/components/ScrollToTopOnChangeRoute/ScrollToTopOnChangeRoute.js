import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { animateScroll } from 'react-scroll';

const ScrollToTopOnChangeRoute = ({ children, location }) => {
  useEffect(() => {
    setTimeout(() => {
      animateScroll.scrollToTop();
    }, 300);
  }, [location.pathname]);
  useEffect(() => {
    setTimeout(() => {
      animateScroll.scrollToTop();
    }, 300);
  }, [location.pathname]);

  return <>{children}</>;
};
ScrollToTopOnChangeRoute.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default memo(withRouter(ScrollToTopOnChangeRoute));
