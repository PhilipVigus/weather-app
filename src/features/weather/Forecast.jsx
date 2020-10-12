import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import { useParams } from "react-router-dom";

import DayNavigator from "./DayNavigator";
import ScrollableWeatherView from "./ScrollableWeatherView";
import { getWeatherById } from "./weatherSlice";

const timeDifferenceInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;

const Forecast = () => {
  const weatherForecast = useSelector((state) => state.weather.forecast);
  const weatherNow = useSelector((state) => state.weather.now);

  const [days, setDays] = useState([]);
  const [dayIndexDisplayed, setDayIndexDisplayed] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getDayFromDateText = (dateAsText) => {
      const UTCDate = new Date(dateAsText);
      const localDate = addMilliseconds(UTCDate, -timeDifferenceInMilliseconds);
      return format(localDate, "EEEE");
    };

    const setDaysFromForecast = () => {
      if (!weatherForecast) {
        return;
      }

      const forecastDays = [];

      for (let i = 0; i < weatherForecast.list.length - 1; i += 1) {
        const day = getDayFromDateText(weatherForecast.list[i].dt_txt);
        const nextDay = getDayFromDateText(weatherForecast.list[i + 1].dt_txt);

        if (day !== nextDay) {
          forecastDays.push(day);
        }
      }

      forecastDays.push(
        getDayFromDateText(
          weatherForecast.list[weatherForecast.list.length - 1].dt_txt
        )
      );

      forecastDays[0] = "Today";
      setDays(forecastDays);
    };

    setDaysFromForecast();
  }, [weatherForecast]);

  useEffect(() => {
    dispatch(getWeatherById(id));
  }, [dispatch, id]);

  const handleDayLinkClick = (index) => {
    setDayIndexDisplayed(index);
  };

  if (!weatherForecast) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <DayNavigator
          days={days}
          clickCallback={handleDayLinkClick}
          dayIndexDisplayed={dayIndexDisplayed}
        />
        <ScrollableWeatherView
          scrollTo={dayIndexDisplayed}
          weatherForecast={weatherForecast}
          weatherNow={weatherNow}
        />
      </>
    );
  }
};

export default Forecast;
