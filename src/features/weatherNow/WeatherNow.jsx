import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWeatherById, getLocations } from "./weatherNowSlice";

const WeatherNow = () => {
  const locations = useSelector(getLocations);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getWeatherById(id));
  }, [dispatch, id]);

  if (locations.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>{`Weather in ${locations[0].name} right now`}</div>
        <div>{locations[0].weather[0].main}</div>
        <div>
          <img
            alt={`${locations[0].weather[0].main} icon`}
            src={`https://openweathermap.org/img/wn/${locations[0].weather[0].icon}@2x.png`}
          />
        </div>
        <div>{`Temp = ${Math.round(locations[0].main.temp - 273.15)} C`}</div>
        <div>{`Humidity = ${locations[0].main.humidity}`}</div>
        <div>{`Wind = ${locations[0].wind.speed} m/s (${locations[0].wind.deg} degrees)`}</div>
        <div>{`${locations[0].clouds.all}% cloud coverage`}</div>
        <div>{locations[0].name}</div>
      </div>
    );
  }
};

export default WeatherNow;
