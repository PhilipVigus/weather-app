import React from "react";
import { useSelector } from "react-redux";

const WeatherForecast = () => {
  const weatherForecast = useSelector((state) => state.weather.forecast);

  if (!weatherForecast) {
    return <div>Loading...</div>;
  }
  return <div>Forecast</div>;
};

export default WeatherForecast;
