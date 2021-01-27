import imgGreen from "components/assets/img/green.jpg";
import imgRed from "components/assets/img/red.jpg";
import React from "react";
import PropTypes from "prop-types";

const RenderUpDowPercent = props => {
  const {up, down} = props;
  const renderUp = () => {
    if (up < 10) {
      return <p><img src={imgGreen} alt=""/></p>;

    } else if (up > 10 && up < 20) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 19 && up < 30) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 29 && up < 40) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 39 && up < 50) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 49 && up < 60) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 59 && up < 70) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 69 && up < 80) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 79 && up < 90) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    } else if (up > 89 && up < 101) {
      return (<>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
        <p><img src={imgGreen} alt=""/></p>
      </>)
    }
  }
  const renderDown = () => {
    if (down < 10) {
      return <p><img src={imgRed} alt=""/></p>;

    } else if (down > 10 && down < 20) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 19 && down < 30) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 29 && down < 40) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 39 && down < 50) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 49 && down < 60) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 59 && down < 70) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 69 && down < 80) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 79 && down < 90) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    } else if (down > 89 && down < 101) {
      return (<>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
        <p><img src={imgRed} alt=""/></p>
      </>)
    }
  }

  return (
    <>
      {
        renderUp()
      }
      {
        renderDown()
      }
    </>
  )

}
RenderUpDowPercent.propTypes = {
  up: PropTypes.any.isRequired,
  down: PropTypes.any.isRequired,
};
export default RenderUpDowPercent;
