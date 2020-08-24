import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import LocationList from "../features/locationList/LocationList";
import Forecast from "../features/weather/Forecast";

const Main = () => {
  const LONDON_ID = "2643743";
  const defaultLocationId = useSelector(
    (state) => state.locationList.defaultLocationId
  );

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (defaultLocationId) {
            return <Redirect to={`/${defaultLocationId}`} />;
          } else {
            return <Redirect to={`/${LONDON_ID}`} />;
          }
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
