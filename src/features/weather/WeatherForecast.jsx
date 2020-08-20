import React from "react";
import { useSelector } from "react-redux";
import WeatherDays from "./WeatherDays";

const WeatherForecast = () => {
  const weatherForecast = useSelector((state) => state.weather.forecast);

  if (!weatherForecast) {
    return <div>Loading...</div>;
  } else {
    return <WeatherDays forecast={weatherForecast} />;
  }
};

export default WeatherForecast;
