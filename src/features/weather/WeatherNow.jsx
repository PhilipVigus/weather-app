import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWeatherById } from "./weatherSlice";

const WeatherNow = () => {
  const weatherNow = useSelector((state) => state.weather.now);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getWeatherById(id));
  }, [dispatch, id]);

  if (!weatherNow) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>{`Weather in ${weatherNow.name} right now`}</div>
        <div>{weatherNow.weather[0].main}</div>
        <div>
          <img
            alt={`${weatherNow.weather[0].main} icon`}
            src={`https://openweathermap.org/img/wn/${weatherNow.weather[0].icon}@2x.png`}
          />
        </div>
        <div>{`Temp = ${Math.round(weatherNow.main.temp - 273.15)} C`}</div>
        <div>{`Humidity = ${weatherNow.main.humidity}`}</div>
        <div>{`Wind = ${weatherNow.wind.speed} m/s (${weatherNow.wind.deg} degrees)`}</div>
        <div>{`${weatherNow.clouds.all}% cloud coverage`}</div>
      </div>
    );
  }
};

export default WeatherNow;
