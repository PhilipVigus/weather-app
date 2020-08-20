import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes, { string, number, arrayOf } from "prop-types";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import styled from "styled-components";
import WeatherDay from "./WeatherDay";

const Days = styled.div`
  display: flex;
`;

const WeatherDays = ({ forecast }) => {
  const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const [foreCastDays, setForecastDays] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const splitForecastIntoDays = (forecast) => {
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

      setForecastDays(days);
    };

    splitForecastIntoDays(forecast);
  }, [forecast, timeOffset]);

  return (
    <Days>
      {foreCastDays.map((day, index) => (
        <WeatherDay key={day.day} forecast={day} today={index === 0} />
      ))}
    </Days>
  );
};

WeatherDays.propTypes = {
  forecast: PropTypes.shape({
    cod: string,
    message: number,
    cnt: number,
    list: arrayOf(
      PropTypes.shape({
        clouds: PropTypes.shape({
          all: number
        }),
        dt: number,
        dt_txt: string,
        main: PropTypes.shape({
          feels_like: number,
          grnd_level: number,
          humidity: number,
          pressure: number,
          sea_level: number,
          temp: number,
          temp_kf: number,
          temp_max: number,
          temp_min: number
        }),
        pop: number,
        sys: PropTypes.shape({
          pd: string
        }),
        visibility: number,
        weather: arrayOf(
          PropTypes.shape({
            description: string,
            icon: string,
            id: number,
            main: string
          })
        ),
        wind: PropTypes.shape({
          speed: number,
          deg: number
        })
      })
    ),
    city: PropTypes.shape({
      coord: PropTypes.shape({
        lat: number,
        lon: number
      }),
      country: string,
      id: number,
      name: string,
      sunrise: number,
      sunset: number,
      timezone: number
    })
  }).isRequired
};

export default WeatherDays;
