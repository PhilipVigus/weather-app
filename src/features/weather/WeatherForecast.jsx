import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const WeatherForecast = () => {
  const weatherForecast = useSelector((state) => state.weather.forecast);
  const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

  const getTimeDateString = (milliseconds) => {
    return format(new Date(milliseconds), "eee p");
  };

  if (!weatherForecast) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>Forecast</div>
        {weatherForecast.list.map((forecastAtTime) => (
          <div key={forecastAtTime.dt}>
            <hr />
            <div>
              {getTimeDateString(forecastAtTime.dt * 1000 + timeOffset)}
            </div>
            <div>{forecastAtTime.weather[0].main}</div>
            <div>
              <img
                alt={`${forecastAtTime.weather[0].main} icon`}
                src={`https://openweathermap.org/img/wn/${forecastAtTime.weather[0].icon}@2x.png`}
              />
            </div>
            <div>
              {`Temp = ${Math.round(forecastAtTime.main.temp - 273.15)} C`}
              <div>{`Humidity = ${forecastAtTime.main.humidity}`}</div>
              <div>{`Wind = ${forecastAtTime.wind.speed} m/s (${forecastAtTime.wind.deg} degrees)`}</div>
              <div>{`${forecastAtTime.clouds.all}% cloud coverage`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default WeatherForecast;
