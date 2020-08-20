import React from "react";
import PropTypes, { string, number, arrayOf } from "prop-types";
import styled from "styled-components";

const StyledNavigator = styled.div`
  display: flex;
`;

const DayNavigator = ({ days }) => {
  console.log(days);
  return (
    <StyledNavigator>
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </StyledNavigator>
  );
};

DayNavigator.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DayNavigator;
