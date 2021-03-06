import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import addMilliseconds from "date-fns/addMilliseconds";
import styled from "styled-components";
import PropTypes, { string, number, arrayOf } from "prop-types";
import WeatherAtTime from "./WeatherAtTime";

const Day = styled.div`
  -ms-overflow-style: none;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  @media (hover: hover) {
    &:hover {
      -ms-overflow-style: auto;
      overflow-x: scroll;
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
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  display: flex;
  flex 0 0 2px;
`;

const GreySpacer = styled.div`
  background: rgb(200, 200, 200);
  margin: 10px 0;
  width: 2px;
`;

const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;

const ScrollableWeatherView = ({ scrollTo, weatherForecast, weatherNow }) => {
  const [dayTransitionIndices, setDayTransitionIndices] = useState([]);
  const dayTransitionRefs = useRef([]);

  useEffect(() => {
    const dayTransitionPositions = [0];
    let previousDay = new Date(weatherForecast.list[0].dt_txt).getDay();

    weatherForecast.list.forEach((forecastAtTime, index) => {
      const currentDay = new Date(forecastAtTime.dt_txt).getDay();
      const isDayTransition = previousDay !== currentDay;

      if (isDayTransition) {
        dayTransitionPositions.push(index);
      }

      previousDay = new Date(forecastAtTime.dt_txt).getDay();
    });

    setDayTransitionIndices(dayTransitionPositions);
  }, [weatherForecast.list]);

  useEffect(() => {
    if (dayTransitionRefs.current[dayTransitionIndices[scrollTo]]) {
      dayTransitionRefs.current[dayTransitionIndices[scrollTo]].scrollIntoView({
        behavior: "smooth",
        inline: "start"
      });
    }
  }, [dayTransitionIndices, scrollTo]);

  const getTimeDateString = (date) => {
    const UTCDate = new Date(date);
    const localDate = addMilliseconds(UTCDate, -timeOffset);
    return format(localDate, "HH:mm");
  };

  const getTimeContainerComponentsForDay = (time, index, newDay) => {
    return (
      <TimeContainer key={time.dt_txt}>
        {newDay && (
          <DayDivider>
            <GreySpacer />
          </DayDivider>
        )}

        <div
          ref={(el) => {
            if (index !== 0) {
              dayTransitionRefs.current[index] = el;
            }
          }}
        >
          <WeatherAtTime
            weather={{
              time: getTimeDateString(time.dt_txt),
              forecast: time
            }}
          />
        </div>
      </TimeContainer>
    );
  };

  const getTimeNowComponent = () => {
    return (
      <TimeContainer key="Now">
        <div
          ref={(el) => {
            dayTransitionRefs.current[0] = el;
          }}
        >
          <WeatherAtTime
            weather={{
              time: "Now",
              forecast: weatherNow
            }}
          />
        </div>
      </TimeContainer>
    );
  };

  let currentDay = new Date(weatherForecast.list[0].dt_txt).getDay();

  return (
    <Day>
      {getTimeNowComponent()}
      {weatherForecast.list.map((time, index) => {
        const isNewDay = currentDay !== new Date(time.dt_txt).getDay();
        currentDay = new Date(time.dt_txt).getDay();
        return getTimeContainerComponentsForDay(time, index, isNewDay);
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
  }).isRequired,
  weatherNow: PropTypes.shape({
    base: PropTypes.string,
    clouds: PropTypes.shape({
      all: PropTypes.number
    }),
    cod: PropTypes.number,
    coord: PropTypes.shape({
      lon: PropTypes.number,
      lat: PropTypes.number
    }),
    dt: PropTypes.number,
    id: PropTypes.number,
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
    sys: PropTypes.shape({
      country: PropTypes.string,
      id: PropTypes.number,
      sunrise: PropTypes.number,
      sunset: PropTypes.number,
      type: PropTypes.number
    }),
    timezone: PropTypes.number,
    visibility: PropTypes.number,
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
  }).isRequired
};

export default ScrollableWeatherView;
