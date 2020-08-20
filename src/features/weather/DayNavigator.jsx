import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DayLink from "./DayLink";

const StyledNavigator = styled.div`
  display: flex;
`;

const handleDayLinkClick = (index) => {};

const DayNavigator = ({ days }) => {
  console.log(days);
  return (
    <StyledNavigator>
      {days.map((day, index) => (
        <DayLink key={day} day={day} index={index} clickCallback={() => {}} />
      ))}
    </StyledNavigator>
  );
};

DayNavigator.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DayNavigator;
