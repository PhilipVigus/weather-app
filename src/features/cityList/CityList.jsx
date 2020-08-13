import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { currentCitySet, fetchCitiesWithInitialLetter } from "./cityListSlice";
import { getWeather } from "../weatherNow/weatherNowSlice";

const CityList = () => {
  const dispatch = useDispatch();
  const [cityText, setCityText] = useState("London");
  const [matchedCities] = useState(["Liverpool", "London", "Lancaster"]);

  useEffect(() => {
    dispatch(currentCitySet("London"));
    dispatch(fetchCitiesWithInitialLetter("l"));
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && cityText) {
      e.preventDefault();
      dispatch(currentCitySet(cityText));
      dispatch(getWeather(cityText));
      setCityText("");
    }
  };

  const handleChange = (e) => {
    setCityText(e.target.value);
  };

  const handleOnFocus = () => {
    setCityText("");
  };

  return (
    <div>
      <div>City List</div>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          onKeyDown={handleKeyDown}
          value={cityText}
          onChange={handleChange}
          onFocus={handleOnFocus}
          style={{ width: "100%" }}
        />
        {matchedCities.map((city) => (
          <div key={city}>{city}</div>
        ))}
      </div>
    </div>
  );
};

export default CityList;
