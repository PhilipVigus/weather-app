/* eslint-disable react/prop-types */
import React from "react";
import PropTypes, { string, number, arrayOf } from "prop-types";
import styled from "styled-components";

const StyledWeatherTime = styled.div`
  border: 1px solid black;
`;

const WeatherTime = ({ forecast }) => {
  return (
    <StyledWeatherTime>
      <div>{forecast.time}</div>
      <div>{forecast.forecast.weather[0].main}</div>
      <div>
        <img
          alt={`${forecast.forecast.weather[0].main} icon`}
          src={`https://openweathermap.org/img/wn/${forecast.forecast.weather[0].icon}@2x.png`}
        />
      </div>
      <div>{Math.round(forecast.forecast.main.temp - 273.15)} C</div>
      <div>{forecast.forecast.main.humidity}% humidity</div>
      <div>{`Wind = ${forecast.forecast.wind.speed} m/s (${forecast.forecast.wind.deg} degrees)`}</div>
      <div>{`${forecast.forecast.clouds.all}% cloud coverage`}</div>
    </StyledWeatherTime>
  );
};

WeatherTime.propTypes = {
  forecast: PropTypes.shape({
    time: PropTypes.string.isRequired,
    forecast: PropTypes.shape({
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
  }).isRequired
};

export default WeatherTime;
