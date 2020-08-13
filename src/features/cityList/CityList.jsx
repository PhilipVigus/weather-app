import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ContentEditable from "./ContentEditable";
import { currentCitySet } from "./cityListSlice";

const CityList = () => {
  const [textContent, setTextContent] = useState(
    "<span style='color:grey'>Enter city name</span>"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentCitySet("London"));
  }, [dispatch]);

  return (
    <div>
      <div>City List</div>
      <ContentEditable html={textContent} />
    </div>
  );
};

export default CityList;
