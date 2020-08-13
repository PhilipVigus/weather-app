import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCitySet, fetchCitiesWithInitialLetter } from "./cityListSlice";
import { getWeather } from "../weatherNow/weatherNowSlice";

const CityList = () => {
  const dispatch = useDispatch();
  const [cityText, setCityText] = useState("London");
  const [currentInitialLetter, setCurrentInitialLetter] = useState("l");
  const citiesList = useSelector((state) => state.cityList.cities);

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

  const getFilteredCities = () => {
    const pattern = new RegExp(`^${cityText}`, "i");
    const filteredCities = citiesList.filter((city) => {
      return pattern.test(city.name);
    });

    if (filteredCities.length === 0) {
      return <div>No matches</div>;
    } else if (filteredCities.length < 10) {
      return (
        <div
          style={{
            position: "absolute",
            backgroundColor: "beige",
            width: "100%"
          }}
        >
          {filteredCities.map((city) => (
            <div key={city.id}>{city.name}</div>
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              backgroundColor: "beige",
              width: "100%"
            }}
          >
            {filteredCities.slice(0, 20).map((city) => (
              <div key={city.id}>{city.name}</div>
            ))}
            <div>{`+${filteredCities.length - 20} matches`}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div>City List</div>
      <div>
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
        {citiesList.length > 0 && cityText && getFilteredCities()}
      </div>
    </div>
  );
};

export default CityList;
