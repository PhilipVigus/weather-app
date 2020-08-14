import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import WeatherNow from "../features/weatherNow/WeatherNow";
import CityList from "../features/cityList/CityList";

const Main = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return (
            <>
              <CityList />
              <WeatherNow />
            </>
          );
        }}
      />
      <Route
        exact
        path="/:id"
        render={() => {
          return (
            <>
              <CityList />
              <WeatherNow />
            </>
          );
        }}
      />
    </Switch>
  );
};

export default Main;
