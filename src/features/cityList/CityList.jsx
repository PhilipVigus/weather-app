import React, { useState } from "react";

const CityList = () => {
  const [cityName, setCityName] = useState("");
  return (
    <div>
      <div>City List</div>
      <label htmlFor="cityName">
        City Name
        <input
          type="text"
          id="cityName"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </label>
    </div>
  );
};

export default CityList;
