import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchLocationsWithInitialLetter } from "./locationListSlice";
import FilteredLocation from "./FilteredLocation";

const LocationList = () => {
  const dispatch = useDispatch();
  const [locationText, setLocationText] = useState("");
  const [currentInitialLetter, setCurrentInitialLetter] = useState("l");
  const [showFilteredLocations, setShowFilteredLocations] = useState(false);
  const locationsList = useSelector((state) => state.locationList.locations);
  const weatherNow = useSelector((state) => state.weather.now);
  const history = useHistory();
  const textBoxRef = useRef(null);

  useEffect(() => {
    textBoxRef.current.blur();
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

  const getFilteredLocations = () => {
    const pattern = new RegExp(`^${locationText}`, "i");
    const filteredLocations = locationsList.filter((location) => {
      return pattern.test(location.name);
    });

    if (filteredLocations.length === 0) {
      return <div>No matches</div>;
    } else if (filteredLocations.length < 10) {
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
    <div>
      <div>Location List</div>
      <div>
        <div>
          <input
            ref={textBoxRef}
            type="text"
            placeholder="Enter location name"
            onKeyDown={handleKeyDown}
            value={locationText}
            onChange={handleChange}
            onFocus={handleOnFocus}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <button type="button">Where I am</button>
        </div>
        {showFilteredLocations &&
          locationsList.length > 0 &&
          locationText &&
          getFilteredLocations()}
      </div>
    </div>
  );
};

export default LocationList;
