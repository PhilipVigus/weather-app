import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Location = styled.div`
  background: rgb(220, 220, 220);
  padding: 2px 10px;

  @media (hover: hover) {
    &:hover {
      background: rgb(200, 200, 200);
    }
  }
`;

const FilteredLocation = ({ name, id, callback }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      callback(id);
    }
  };

  return (
    <Location
      key={id}
      role="link"
      onClick={() => callback(id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {name}
    </Location>
  );
};

FilteredLocation.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
};

export default FilteredLocation;
