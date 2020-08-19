import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

import { fetchLocationsWithInitialLetter } from "./locationListSlice";
import FilteredLocation from "./FilteredLocation";
import { getWeatherByGPS } from "../weather/weatherSlice";

const StyledNav = styled.nav`
  background: rgb(56, 56, 56);
  color: white;
  padding: 20px 150px;
`;

const UserInputs = styled.div`
  color: black;
  display: flex;
  background: white;
`;

const StyledInput = styled.input`
  border: none;
  font-size: 1.6rem;
  padding: 0 15px;
`;

const SearchButton = styled.button`
  background: white;
  border: none;
  color: rgb(56, 56, 56);
  font-size: 2rem;
  padding: 10px;
`;

const MyLocationButton = styled.button`
  border: none;
  background: rgb(56, 56, 56);
  color: white;
  font-size: 2.5rem;
  padding: 11px 20px;
`;

const LocationList = () => {
  const dispatch = useDispatch();
  const [locationText, setLocationText] = useState("");
  const [currentInitialLetter, setCurrentInitialLetter] = useState("l");
  const [showFilteredLocations, setShowFilteredLocations] = useState(false);
  const locationsList = useSelector((state) => state.locationList.locations);
  const weatherNow = useSelector((state) => state.weather.now);
  const GPSAvailable = useSelector((state) => state.weather.GPSAvailable);
  const history = useHistory();
  const textBoxRef = useRef(null);
  const myLocationButtonRef = useRef(null);

  useEffect(() => {
    textBoxRef.current.blur();
    myLocationButtonRef.current.blur();

    if (weatherNow) {
      dispatch(
        fetchLocationsWithInitialLetter(
          weatherNow.name.charAt(0).toLocaleLowerCase()
        )
      );
      setLocationText(weatherNow.name);
    }
  }, [dispatch, weatherNow]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && locationText) {
      e.preventDefault();
      const newLocation = locationsList.find((location) => {
        const pattern = new RegExp(`^${locationText}`, "i");
        return pattern.test(location.name);
      });
      setShowFilteredLocations(false);
      history.push(`/${newLocation.id}`);
    }
  };

  const handleChange = (e) => {
    if (
      e.target.value &&
      e.target.value.charAt(0).toLocaleLowerCase() !== currentInitialLetter
    ) {
      dispatch(
        fetchLocationsWithInitialLetter(
          e.target.value.charAt(0).toLocaleLowerCase()
        )
      );
      setCurrentInitialLetter(e.target.value.charAt(0).toLocaleLowerCase());
    }

    if (e.target.value) {
      setShowFilteredLocations(true);
    }

    setLocationText(e.target.value);
  };

  const handleOnFocus = () => {
    setLocationText("");
  };

  const handleLocationClick = (id) => {
    setShowFilteredLocations(false);
    history.push(`/${id}`);
  };

  const handleWhereIAmClick = () => {
    dispatch(getWeatherByGPS());
  };

  const handleSearchClick = () => {
    if (locationText && showFilteredLocations) {
      const newLocation = locationsList.find((location) => {
        const pattern = new RegExp(`^${locationText}`, "i");
        return pattern.test(location.name);
      });
      setShowFilteredLocations(false);
      history.push(`/${newLocation.id}`);
    }
  };

  const getFilteredLocations = () => {
    const pattern = new RegExp(`^${locationText}`, "i");
    const filteredLocations = locationsList.filter((location) => {
      return pattern.test(location.name);
    });

    if (filteredLocations.length === 0) {
      return <div>No matches</div>;
    } else if (filteredLocations.length < 21) {
      return (
        <div
          style={{
            position: "absolute",
            backgroundColor: "beige",
            width: "100%"
          }}
        >
          {filteredLocations.map((location) => (
            <FilteredLocation
              key={location.id}
              id={location.id}
              name={location.name}
              callback={handleLocationClick}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              backgroundColor: "beige",
              width: "100%"
            }}
          >
            {filteredLocations.slice(0, 20).map((location) => (
              <FilteredLocation
                key={location.id}
                id={location.id}
                name={location.name}
                callback={handleLocationClick}
              />
            ))}
            <div>{`+${filteredLocations.length - 20} matches`}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <StyledNav>
      <UserInputs>
        <StyledInput
          ref={textBoxRef}
          type="text"
          placeholder="Enter location name"
          onKeyDown={handleKeyDown}
          value={locationText}
          onChange={handleChange}
          onFocus={handleOnFocus}
          style={{ width: "100%" }}
        />
        <SearchButton
          aria-label="search"
          type="button"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
        <div>
          <MyLocationButton
            aria-label="weather at my location"
            ref={myLocationButtonRef}
            type="button"
            onClick={handleWhereIAmClick}
            disabled={!GPSAvailable}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </MyLocationButton>
        </div>
      </UserInputs>
      {showFilteredLocations &&
        locationsList.length > 0 &&
        locationText &&
        getFilteredLocations()}
    </StyledNav>
  );
};

export default LocationList;
