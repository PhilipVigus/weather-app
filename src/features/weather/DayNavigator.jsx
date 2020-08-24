import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DayLink from "./DayLink";

const StyledNavigator = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

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
