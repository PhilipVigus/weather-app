import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import { useParams } from "react-router-dom";
import DayNavigator from "./DayNavigator";
import ScrollableWeatherView from "./ScrollableWeatherView";
import { getWeatherById } from "./weatherSlice";

const Forecast = () => {
  const weatherForecast = useSelector((state) => state.weather.forecast);
  const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const [forecastAsDays, setForecastAsDays] = useState([]);
  const [dayIndexDisplayed, setDayIndexDisplayed] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
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

  useEffect(() => {
    dispatch(getWeatherById(id));
  }, [dispatch, id]);

  const handleDayLinkClick = (index) => {
    setDayIndexDisplayed(index);
  };

  if (!weatherForecast || forecastAsDays.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <DayNavigator
          days={forecastAsDays.map((forecastDay) => {
            return forecastDay.day;
          })}
          clickCallback={handleDayLinkClick}
        />
        <ScrollableWeatherView
          forecast={forecastAsDays}
          scrollTo={dayIndexDisplayed}
        />
      </>
    );
  }
};

export default Forecast;