import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getWeatherById } from "./weatherSlice";
import WeatherNow from "./WeatherNow";
import WeatherForecast from "./WeatherForecast";

const WeatherContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getWeatherById(id));
  }, [dispatch, id]);
  return (
    <main>
      <WeatherNow />
      <WeatherForecast />
    </main>
  );
};

export default WeatherContainer;
