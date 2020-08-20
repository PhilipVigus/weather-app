import React from "react";
import PropTypes from "prop-types";

const DayLink = ({ day, index, clickCallback }) => {
  return <input type="button" value={day} onClick={clickCallback(index)} />;
};

DayLink.propTypes = {
  day: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clickCallback: PropTypes.func.isRequired
};

export default DayLink;
