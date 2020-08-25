import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DayLink from "./DayLink";

const StyledNavigator = styled.div`
  -ms-overflow-style: none;
  align-items: flex-end;
  display: flex;
  margin-top: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DayNavigator = ({ days, clickCallback, dayIndexDisplayed }) => {
  return (
    <StyledNavigator>
      {days.map((day, index) => {
        return (
          <DayLink
            hasFocus={index === dayIndexDisplayed}
            key={day}
            day={day}
            index={index}
            clickCallback={clickCallback}
          />
        );
      })}
    </StyledNavigator>
  );
};

DayNavigator.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickCallback: PropTypes.func.isRequired,
  dayIndexDisplayed: PropTypes.number.isRequired
};

export default DayNavigator;
