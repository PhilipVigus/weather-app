/* eslint-disable react/prop-types */
import React from "react";
import PropTypes, { string, number, arrayOf } from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";

const StyledWeatherAtTime = styled.div`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 0 20px;
`;

const Time = styled.div`
  border-bottom: 1px solid rgb(220, 220, 220);
  margin: 0 10px;
  padding: 5px 0;
  text-align: center;
`;

const ImageContainer = styled.div`
  text-align: center;
`;

const Temperature = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: -10px;
  text-align: center;
`;

const Wind = styled.div`
  text-align: center;
`;

const WindIcon = styled.div`
  margin-top: 20px;
  font-size: 2rem;
`;

const WindSpeedAndDirection = styled.div`
  font-size: 1.6rem;
`;

const CloudCoverage = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Humidity = styled.div`
  text-align: center;
`;

const WeatherAtTime = ({ forecast }) => {
  return (
    <StyledWeatherAtTime>
      <Time>{forecast.time}</Time>
      <ImageContainer>
        <img
          alt={`${forecast.forecast.weather[0].main} icon`}
          src={`https://openweathermap.org/img/wn/${forecast.forecast.weather[0].icon}@2x.png`}
        />
      </ImageContainer>
      <Temperature>
        {Math.round(forecast.forecast.main.temp - 273.15)}°
      </Temperature>
      <Wind>
        <WindIcon>
          <FontAwesomeIcon icon={faWind} />
        </WindIcon>
        <WindSpeedAndDirection>
          {`${Math.round(forecast.forecast.wind.speed)} m/s (${
            forecast.forecast.wind.deg
          } °)`}
        </WindSpeedAndDirection>
      </Wind>
      <CloudCoverage>{`${forecast.forecast.clouds.all}% cloud coverage`}</CloudCoverage>
      <Humidity>{forecast.forecast.main.humidity}% humidity</Humidity>
    </StyledWeatherAtTime>
  );
};

WeatherAtTime.propTypes = {
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

export default WeatherAtTime;
