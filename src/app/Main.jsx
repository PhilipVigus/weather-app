import React from "react";
import WeatherNow from "../features/weatherNow/WeatherNow";
import CityList from "../features/cityList/CityList";

const Main = () => {
  return (
    <>
      <CityList />
      <WeatherNow />
    </>
  );
};

export default Main;
