import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import LocationList from "../features/locationList/LocationList";
import WeatherContainer from "../features/weather/WeatherContainer";

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
              <Header />
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
