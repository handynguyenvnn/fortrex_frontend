import React from "react";
import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return { isDesktopOrLaptop, isTabletOrMobile };
};
