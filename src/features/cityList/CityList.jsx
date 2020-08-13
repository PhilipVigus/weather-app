import React, { useState } from "react";
import ContentEditable from "./ContentEditable";

const CityList = () => {
  return (
    <div>
      <div>City List</div>
      <ContentEditable html="Enter city name" />
    </div>
  );
};

export default CityList;
