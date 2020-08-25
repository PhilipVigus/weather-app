import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLink = styled.input`
  background: ${(props) => (props.focused ? " rgb(240, 240, 240)" : "white")};
  border: 1px solid grey;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-size: ${(props) => (props.focused ? "1.8rem" : "1.6rem")};
  margin: 0 5px;
  outline: none;
  padding: ${(props) => (props.focused ? "18px" : "15px")};

  &:last-of-type {
    border-right: 1px solid grey;
  }
`;

const DayLink = ({ day, index, clickCallback, hasFocus }) => {
  return (
    <StyledLink
      focused={hasFocus}
      type="button"
      value={day}
      onClick={() => clickCallback(index)}
    />
  );
};

DayLink.propTypes = {
  day: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clickCallback: PropTypes.func.isRequired,
  hasFocus: PropTypes.bool.isRequired
};

export default DayLink;
