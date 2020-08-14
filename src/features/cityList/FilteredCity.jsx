import React from "react";
import PropTypes from "prop-types";

const FilteredCity = ({ name, id, callback }) => {
  const handleKeyPress = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      callback(id);
    }
  };

  return (
    <div
      key={id}
      role="link"
      onClick={() => callback(id)}
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      {name}
    </div>
  );
};

FilteredCity.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default FilteredCity;
