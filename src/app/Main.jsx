import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../features/weatherNow/weatherNowSlice";

const Main = () => {
  const locations = useSelector((state) => state.weatherNow.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeather());
  }, [dispatch]);

  if (locations.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>{`Weather in ${locations[0].name} right now`}</div>
        <div>{`Temp = ${locations[0].main.temp - 273.15} C`}</div>
        <div>{`Humidity = ${locations[0].main.humidity}`}</div>
        <div>{`Wind = ${locations[0].wind.speed} m/s (${locations[0].wind.deg} degrees)`}</div>
        <div>{`${locations[0].clouds.all}% cloud coverage`}</div>
      </div>
    );
  }
};

export default Main;
