import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSearch,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOUtline } from "@fortawesome/free-regular-svg-icons";

import ReactTooltip from "react-tooltip";

import {
  fetchLocationsWithInitialLetter,
  defaultLocationIdSet
} from "./locationListSlice";
import FilteredLocation from "./FilteredLocation";
import { getWeatherByGPS } from "../weather/weatherSlice";

const StyledNav = styled.nav`
  background: rgb(56, 56, 56);
  color: white;
  padding: 20px 10%;
`;

const UserInputs = styled.div`
  align-items: center;
  background: white;
  color: black;
  display: flex;
`;

const StyledTextbox = styled.input`
  border: none;
  font-size: 3rem;
  padding: 10px 15px;
  width: 100%;

  @media (max-width: 48em) {
    & {
      font-size: 2rem;
    }
  }

  @media (max-width: 37.5em) {
    html {
      font-size: 1.5rem;
    }
  }
`;

const IconButton = styled.button`
  background: white;
  border: none;
  color: rgb(56, 56, 56);
  font-size: 2.5rem;
  padding: 10px;
`;

const FilterLocationsContainer = styled.div`
  position: relative;
`;

const FilteredLocations = styled.div`
  background: rgb(220, 220, 220);
  color: black;
  position: absolute;
  width: 100%;
`;

const AdditionalMatches = styled.div`
  padding: 2px 10px;
`;

const LocationList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [textboxText, setTextboxText] = useState("");
  const [currentInitialLetter, setCurrentInitialLetter] = useState("");
  const [showFilteredLocations, setShowFilteredLocations] = useState(false);

  const locationsList = useSelector((state) => state.locationList.locations);
  const weatherNow = useSelector((state) => state.weather.now);
  const GPSAvailable = useSelector((state) => state.weather.GPSAvailable);
  const defaultLocationId = useSelector(
    (state) => state.locationList.defaultLocationId
  );

  const textBoxRef = useRef(null);
  const myLocationButtonRef = useRef(null);

  useEffect(() => {
    // prevent elements having focus when page reloads to new location
    textBoxRef.current.blur();
    myLocationButtonRef.current.blur();

    // get the location list for locations starting with the same
    // letter as the current location
    if (weatherNow) {
      const currentLocationInitialLetter = weatherNow.name
        .charAt(0)
        .toLocaleLowerCase();
      dispatch(fetchLocationsWithInitialLetter(currentLocationInitialLetter));
      setTextboxText(weatherNow.name);
    }
  }, [dispatch, weatherNow]);

  const handleKeyDownInTextbox = (e) => {
    if (e.key === "Enter" && textboxText) {
      e.preventDefault();

      const newLocation = locationsList.find((location) => {
        const filterPattern = new RegExp(`^${textboxText}`, "i");
        return filterPattern.test(location.name);
      });

      setShowFilteredLocations(false);
      history.push(`/${newLocation.id}`);
    }
  };

  const handleTextboxContentChange = (e) => {
    const textBoxInitialLetter = e.target.value.charAt(0).toLocaleLowerCase();

    if (e.target.value && textBoxInitialLetter !== currentInitialLetter) {
      dispatch(fetchLocationsWithInitialLetter(textBoxInitialLetter));
      setCurrentInitialLetter(textBoxInitialLetter);
    }

    if (e.target.value) {
      setShowFilteredLocations(true);
    }

    setTextboxText(e.target.value);
  };

  const handleTextboxGainingFocus = () => {
    setTextboxText("");
  };

  const handleLocationClick = (newId) => {
    setShowFilteredLocations(false);
    history.push(`/${newId}`);
  };

  const handleWeatherHereClick = () => {
    dispatch(getWeatherByGPS());
  };

  const handleSearchClick = () => {
    if (textboxText && showFilteredLocations) {
      const newLocation = locationsList.find((location) => {
        const filterPattern = new RegExp(`^${textboxText}`, "i");
        return filterPattern.test(location.name);
      });
      setShowFilteredLocations(false);
      history.push(`/${newLocation.id}`);
    }
  };

  const handleSetDefaultLocationClick = () => {
    dispatch(defaultLocationIdSet(id));
  };

  const getFilteredLocationComponents = (locations) => {
    const NUMBER_OF_LOCATIONS_TO_LIST = 20;
    return (
      <>
        {locations.slice(0, NUMBER_OF_LOCATIONS_TO_LIST).map((location) => (
          <FilteredLocation
            key={location.id}
            id={location.id}
            name={location.name}
            callback={handleLocationClick}
          />
        ))}
        <AdditionalMatches>
          {locations.length > NUMBER_OF_LOCATIONS_TO_LIST &&
            `+${locations.length - NUMBER_OF_LOCATIONS_TO_LIST} matches`}
        </AdditionalMatches>
      </>
    );
  };

  const getFilteredLocationsList = () => {
    const filterPattern = new RegExp(`^${textboxText}`, "i");
    const filteredLocations = locationsList.filter((location) => {
      return filterPattern.test(location.name);
    });

    if (filteredLocations.length === 0) {
      return <div>No matches</div>;
    } else {
      return (
        <FilterLocationsContainer>
          <FilteredLocations>
            {getFilteredLocationComponents(filteredLocations)}
          </FilteredLocations>
        </FilterLocationsContainer>
      );
    }
  };

  return (
    <StyledNav>
      <UserInputs>
        <IconButton
          aria-label="bookmark as your default location"
          type="button"
          onClick={handleSetDefaultLocationClick}
          data-tip="Bookmark as your default location"
        >
          {defaultLocationId && defaultLocationId === id ? (
            <FontAwesomeIcon icon={faStar} />
          ) : (
            <FontAwesomeIcon icon={faStarOUtline} />
          )}
        </IconButton>

        <StyledTextbox
          ref={textBoxRef}
          type="text"
          placeholder="Enter location name"
          value={textboxText}
          onKeyDown={handleKeyDownInTextbox}
          onChange={handleTextboxContentChange}
          onFocus={handleTextboxGainingFocus}
          data-tip="Click to enter a location"
        />

        <IconButton
          aria-label="search"
          type="button"
          onClick={handleSearchClick}
          data-tip="Find the closest location matching the text"
        >
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>

        <IconButton
          aria-label="weather at my location"
          ref={myLocationButtonRef}
          type="button"
          onClick={handleWeatherHereClick}
          disabled={!GPSAvailable}
          data-tip="Weather at my location"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </IconButton>

        <ReactTooltip />
      </UserInputs>

      {showFilteredLocations &&
        locationsList.length > 0 &&
        textboxText &&
        getFilteredLocationsList()}
    </StyledNav>
  );
};

export default LocationList;
