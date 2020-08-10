import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../features/weatherNow/weatherNowSlice";

const Main = () => {
  const data = useSelector((state) => state.weatherNow.london);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeather());
  }, [dispatch]);

  return (
    <div>
      <div>Weather in London right now</div>
      {data && <div>{`Temp = ${data.main.temp - 273.15} C`}</div>}
      {data && <div>{`Humidity = ${data.main.humidity}`}</div>}
      {data && (
        <div>{`Wind = ${data.wind.speed} m/s (${data.wind.deg} degrees)`}</div>
      )}
      {data && <div>{`${data.clouds.all}% cloud coverage`}</div>}
      <div>{data.visibility}</div>
    </div>
  );
};

export default Main;
