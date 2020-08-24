import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLink = styled.input`
  background: white;
  border: 1px solid grey;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 15px;
  margin: 0 5px;
  outline: none;

  &:last-of-type {
    border-right: 1px solid grey;
  }
`;

const StyledLinkWithFocus = styled.input`
  background: rgb(240, 240, 240);
  border: 1px solid grey;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
  outline: none;
  padding: 18px;
  margin: 0 5px;

  &:last-of-type {
    border-right: 1px solid grey;
  }
`;

const DayLink = ({ day, index, clickCallback, hasFocus }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (hasFocus) {
      buttonRef.current.focus();
    }
  }, [hasFocus]);

  if (hasFocus) {
    return (
      <StyledLinkWithFocus
        ref={buttonRef}
        type="button"
        value={day}
        onClick={() => clickCallback(index)}
      />
    );
  } else {
    return (
      <StyledLink
        ref={buttonRef}
        type="button"
        value={day}
        onClick={() => clickCallback(index)}
      />
    );
  }
};

DayLink.propTypes = {
  day: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  clickCallback: PropTypes.func.isRequired,
  hasFocus: PropTypes.bool.isRequired
};

export default DayLink;
