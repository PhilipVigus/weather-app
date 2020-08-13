import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { currentCitySet, getCities } from "./cityListSlice";
import { getWeather } from "../weatherNow/weatherNowSlice";

const CityList = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("London");

  useEffect(() => {
    dispatch(currentCitySet("London"));
    dispatch(getCities("l"));
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city) {
      e.preventDefault();
      dispatch(currentCitySet(city));
      dispatch(getWeather(city));
      setCity("");
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
