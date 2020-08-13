import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCitySet, fetchCitiesWithInitialLetter } from "./cityListSlice";
import { getWeather } from "../weatherNow/weatherNowSlice";

const CityList = () => {
  const dispatch = useDispatch();
  const [cityText, setCityText] = useState("London");
  const [currentInitialLetter, setCurrentInitialLetter] = useState("l");
  const citiesList = useSelector((state) => state.cityList.cities);

  console.log(citiesList);

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
    if (
      e.target.value &&
      e.target.value.charAt(0).toLocaleLowerCase() !== currentInitialLetter
    ) {
      dispatch(
        fetchCitiesWithInitialLetter(
          e.target.value.charAt(0).toLocaleLowerCase()
        )
      );
      setCurrentInitialLetter(e.target.value.charAt(0).toLocaleLowerCase());
    }
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
      </div>
    </div>
  );
};

export default CityList;
