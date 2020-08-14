import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import WeatherNow from "../features/weatherNow/WeatherNow";
import LocationList from "../features/cityList/LocationList";

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
              <LocationList />
              <WeatherNow />
            </>
          );
        }}
      />
    </Switch>
  );
};

export default Main;
