import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import LocationList from "../features/locationList/LocationList";
import Forecast from "../features/weather/Forecast";

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
              <Forecast />
            </>
          );
        }}
      />
    </Switch>
  );
};

export default Main;
