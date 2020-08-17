import React from "react";
import { useSelector } from "react-redux";

const WeatherNow = () => {
  const weatherNow = useSelector((state) => state.weather.now);

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
