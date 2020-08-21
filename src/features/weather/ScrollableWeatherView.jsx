import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import styled from "styled-components";
import PropTypes, { string, number, arrayOf } from "prop-types";
import WeatherAtTime from "./WeatherAtTime";

const Day = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

const ScrollableWeatherView = ({ forecast, scrollTo }) => {
  const [forecastAsTimes, setForecastAsTimes] = useState([]);
  const [bookmarkPositions, setBookmarkPositions] = useState([]);
  const bookmarkRefs = useRef([]);

  useEffect(() => {
    const times = [];
    const positions = [];

    forecast.forEach((day) => {
      day.forecast.forEach((time, dayIndex) => {
        if (dayIndex === 0) {
          positions.push(times.length);
        }
        times.push(time);
      });
    });

    setForecastAsTimes(times);
    setBookmarkPositions(positions);
  }, [forecast]);

  useEffect(() => {
    if (bookmarkRefs.current[bookmarkPositions[scrollTo]]) {
      bookmarkRefs.current[bookmarkPositions[scrollTo]].scrollIntoView({
        behavior: "smooth",
        inline: "start"
      });
    }
  }, [bookmarkPositions, scrollTo]);

  const getTimeDateString = (date) => {
    const UTCDate = new Date(date);
    const localDate = addMilliseconds(UTCDate, -timeOffset);
    return format(localDate, "HH:mm");
  };

  return (
    <Day>
      {forecastAsTimes.map((time, index) => (
        // eslint-disable-next-line no-return-assign
        <div key={time.dt} ref={(el) => (bookmarkRefs.current[index] = el)}>
          <WeatherAtTime
            forecast={{ time: getTimeDateString(time.dt_txt), forecast: time }}
          />
        </div>
      ))}
    </Day>
  );
};

ScrollableWeatherView.propTypes = {
  scrollTo: PropTypes.number.isRequired,
  forecast: PropTypes.arrayOf(
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
  ).isRequired
};

export default ScrollableWeatherView;
