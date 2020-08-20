import React from "react";
import PropTypes, { string, number, arrayOf } from "prop-types";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import styled from "styled-components";

const Day = styled.div`
  display: flex;
`;

const WeatherDay = ({ forecast }) => {
  const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

  const getTimeDateString = (date) => {
    const UTCDate = new Date(date);
    const localDate = addMilliseconds(UTCDate, -timeOffset);
    return format(localDate, "HH:mm");
  };
  return (
    <div>
      <div>{forecast.day}</div>
      <Day>
        {forecast.forecast.map((timeForecast) => (
          <div key={timeForecast.dt_txt}>
            {getTimeDateString(timeForecast.dt_txt)}
          </div>
        ))}
      </Day>
    </div>
  );
};

WeatherDay.propTypes = {
  forecast: PropTypes.shape({
    day: PropTypes.string.isRequired,
    forecast: arrayOf(
      PropTypes.shape({
        forecast: PropTypes.shape({
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
      })
    )
  }).isRequired
};

export default WeatherDay;
