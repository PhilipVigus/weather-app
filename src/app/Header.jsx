import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background: black;
  color: white;
  font-size: 5rem;
  padding-left: 150px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1>Weather</h1>
    </StyledHeader>
  );
};

export default Header;
