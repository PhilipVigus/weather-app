import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import WeatherNow from "../features/weatherNow/WeatherNow";
import CityList from "../features/cityList/CityList";

const Main = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/2643743" />;
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
