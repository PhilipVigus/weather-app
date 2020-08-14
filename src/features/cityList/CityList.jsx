import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCitiesWithInitialLetter } from "./cityListSlice";
import FilteredCity from "./FilteredCity";

const CityList = () => {
  const dispatch = useDispatch();
  const [cityText, setCityText] = useState("");
  const [currentInitialLetter, setCurrentInitialLetter] = useState("l");
  const [showFilteredCities, setShowFilteredCities] = useState(false);
  const citiesList = useSelector((state) => state.cityList.cities);
  const locations = useSelector((state) => state.weatherNow.locations);
  const history = useHistory();
  const textBoxRef = useRef(null);

  useEffect(() => {
    textBoxRef.current.blur();
    if (locations.length > 0) {
      dispatch(
        fetchCitiesWithInitialLetter(
          locations[0].name.charAt(0).toLocaleLowerCase()
        )
      );
      setCityText(locations[0].name);
    }
  }, [dispatch, locations]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && cityText) {
      e.preventDefault();
      const newLocation = citiesList.find((location) => {
        const pattern = new RegExp(`^${cityText}`, "i");
        return pattern.test(location.name);
      });
      setShowFilteredCities(false);
      history.push(`/${newLocation.id}`);
    }
  };

  const handleChange = (e) => {
    if (
      e.target.value &&
      e.target.value.charAt(0).toLocaleLowerCase() !== currentInitialLetter
    ) {
      dispatch(
        fetchCitiesWithInitialLetter(
          e.target.value.charAt(0).toLocaleLowerCase()
        )
      );
      setCurrentInitialLetter(e.target.value.charAt(0).toLocaleLowerCase());
    }

    if (e.target.value) {
      setShowFilteredCities(true);
    }

    setCityText(e.target.value);
  };

  const handleOnFocus = () => {
    setCityText("");
  };

  const handleCityClick = (id) => {
    setShowFilteredCities(false);
    history.push(`/${id}`);
  };

  const getFilteredCities = () => {
    const pattern = new RegExp(`^${cityText}`, "i");
    const filteredCities = citiesList.filter((city) => {
      return pattern.test(city.name);
    });

    if (filteredCities.length === 0) {
      return <div>No matches</div>;
    } else if (filteredCities.length < 10) {
      return (
        <div
          style={{
            position: "absolute",
            backgroundColor: "beige",
            width: "100%"
          }}
        >
          {filteredCities.map((city) => (
            <FilteredCity
              key={city.id}
              id={city.id}
              name={city.name}
              callback={handleCityClick}
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
            {filteredCities.slice(0, 20).map((city) => (
              <FilteredCity
                key={city.id}
                id={city.id}
                name={city.name}
                callback={handleCityClick}
              />
            ))}
            <div>{`+${filteredCities.length - 20} matches`}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div>City List</div>
      <div>
        <div>
          <input
            ref={textBoxRef}
            type="text"
            placeholder="Enter city name"
            onKeyDown={handleKeyDown}
            value={cityText}
            onChange={handleChange}
            onFocus={handleOnFocus}
            style={{ width: "100%" }}
          />
        </div>
        {showFilteredCities &&
          citiesList.length > 0 &&
          cityText &&
          getFilteredCities()}
      </div>
    </div>
  );
};

export default CityList;
