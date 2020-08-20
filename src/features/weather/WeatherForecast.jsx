import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import WeatherDays from "./WeatherDays";
import DayNavigator from "./DayNavigator";

const WeatherForecast = () => {
  const weatherForecast = useSelector((state) => state.weather.forecast);
  const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const [forecastAsDays, setForecastAsDays] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const splitForecastIntoDays = (forecast) => {
      if (!weatherForecast) {
        return;
      }

      const days = [];
      let dayForecasts = [];

      for (let i = 0; i < forecast.list.length; i += 1) {
        const UTCDate = new Date(forecast.list[i].dt_txt);
        const localDate = addMilliseconds(UTCDate, -timeOffset);
        const day = format(localDate, "EEEE");

        dayForecasts.push(forecast.list[i]);

        if (i === forecast.list.length - 1) {
          days.push({ day, forecast: dayForecasts });
          dayForecasts = [];
        } else {
          const nextUTCDate = new Date(forecast.list[i + 1].dt_txt);
          const nextlocalDate = addMilliseconds(nextUTCDate, -timeOffset);
          const nextDay = format(nextlocalDate, "EEEE");

          if (day !== nextDay) {
            days.push({ day, forecast: dayForecasts });
            dayForecasts = [];
          }
        }
      }

      days[0].day = "Today";
      setForecastAsDays(days);
    };

    splitForecastIntoDays(weatherForecast);
  }, [weatherForecast, timeOffset]);

  if (!weatherForecast) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <DayNavigator
          days={forecastAsDays.map((forecastDay) => {
            return forecastDay.day;
          })}
        />
        <WeatherDays forecast={weatherForecast} />
      </>
    );
  }
};

export default WeatherForecast;
