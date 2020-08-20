import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DayLink from "./DayLink";

const StyledNavigator = styled.div`
  display: flex;
`;

const DayNavigator = ({ days, clickCallback }) => {
  return (
    <StyledNavigator>
      {days.map((day, index) => (
        <DayLink
          key={day}
          day={day}
          index={index}
          clickCallback={clickCallback}
        />
      ))}
    </StyledNavigator>
  );
};

DayNavigator.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickCallback: PropTypes.func.isRequired
};

export default DayNavigator;
