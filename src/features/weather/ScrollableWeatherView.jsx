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
    background-color: transparent;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  @media (hover: hover) {
    &:hover {
      overflow-x: scroll;
      -ms-overflow-style: auto;
      scrollbar-width: auto;
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: grey;
      }
    }
  }
`;

const TimeContainer = styled.div`
  display: flex;
`;

const DayDivider = styled.div`
  display: flex;
  flex 0 0 2px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const GreySpacer = styled.div`
  background: rgb(200, 200, 200);
  width: 2px;
  margin: 10px 0;
`;

const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

const ScrollableWeatherView = ({ scrollTo, weatherForecast }) => {
  const [bookmarkPositions, setBookmarkPositions] = useState([]);
  const bookmarkRefs = useRef([]);

  useEffect(() => {
    const splitForecastIntoDays = (f) => {
      const days = [];
      let dayForecasts = [];

      for (let i = 0; i < f.list.length; i += 1) {
        const UTCDate = new Date(f.list[i].dt_txt);
        const localDate = addMilliseconds(UTCDate, -timeOffset);
        const day = format(localDate, "EEEE");

        dayForecasts.push(f.list[i]);

        if (i === f.list.length - 1) {
          days.push({ day, forecast: dayForecasts });
          dayForecasts = [];
        } else {
          const nextUTCDate = new Date(f.list[i + 1].dt_txt);
          const nextlocalDate = addMilliseconds(nextUTCDate, -timeOffset);
          const nextDay = format(nextlocalDate, "EEEE");

          if (day !== nextDay) {
            days.push({ day, forecast: dayForecasts });
            dayForecasts = [];
          }
        }
      }

      days[0].day = "Today";
      return days;
    };

    const getBookmarkPositions = (forecastDays) => {
      let cumulativeTimeIndex = 0;
      const positions = [];

      forecastDays.forEach((day) => {
        day.forecast.forEach((time, dayIndex) => {
          if (dayIndex === 0) {
            positions.push(cumulativeTimeIndex);
          }
          cumulativeTimeIndex += 1;
        });
      });

      return positions;
    };

    const forecastAsDays = splitForecastIntoDays(weatherForecast);
    setBookmarkPositions(getBookmarkPositions(forecastAsDays));
  }, [weatherForecast]);

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

  let currentDay = new Date(weatherForecast.list[0].dt_txt).getDay();

  return (
    <Day>
      {weatherForecast.list.map((time, index) => {
        const newDay = currentDay !== new Date(time.dt_txt).getDay();
        currentDay = new Date(time.dt_txt).getDay();

        return (
          <TimeContainer key={time.dt_txt}>
            {newDay && (
              <DayDivider>
                <GreySpacer />
              </DayDivider>
            )}
            <div ref={(el) => (bookmarkRefs.current[index] = el)}>
              <WeatherAtTime
                forecast={{
                  time: getTimeDateString(time.dt_txt),
                  forecast: time
                }}
              />
            </div>
          </TimeContainer>
        );
      })}
    </Day>
  );
};

ScrollableWeatherView.propTypes = {
  scrollTo: PropTypes.number.isRequired,
  weatherForecast: PropTypes.shape({
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

export default ScrollableWeatherView;
