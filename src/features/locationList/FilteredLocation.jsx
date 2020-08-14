import React from "react";
import PropTypes from "prop-types";

const FilteredLocation = ({ name, id, callback }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      callback(id);
    }
  };

  return (
    <div
      key={id}
      role="link"
      onClick={() => callback(id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {name}
    </div>
  );
};

FilteredLocation.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
};

export default FilteredLocation;
