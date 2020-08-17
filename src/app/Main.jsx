import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import WeatherContainer from "../features/weather/WeatherContainer";
import LocationList from "../features/locationList/LocationList";

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
              <WeatherContainer />
            </>
          );
        }}
      />
    </Switch>
  );
};

export default Main;
