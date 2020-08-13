import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { currentCitySet } from "./cityListSlice";
import { getWeather } from "../weatherNow/weatherNowSlice";

const CityList = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("London");

  useEffect(() => {
    dispatch(currentCitySet("London"));
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(currentCitySet(city));
      dispatch(getWeather(city));
    }
  };

  return (
    <div>
      <div>City List</div>
      <input
        type="text"
        placeholder="Enter city name"
        onKeyDown={handleKeyDown}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
};

export default CityList;
