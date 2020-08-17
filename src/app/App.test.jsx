import React from "react";
import { render, screen } from "@testing-library/react";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

describe("App", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(Axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders the weather now and location list", async () => {
    mock
      .onGet()
      .replyOnce(200, { name: "London" })
      .onGet()
      .replyOnce(200, {
        coord: { lon: -0.13, lat: 51.51 },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02d"
          }
        ],
        base: "stations",
        main: {
          temp: 304.61,
          feels_like: 305.31,
          temp_min: 304.15,
          temp_max: 305.93,
          pressure: 1013,
          humidity: 42
        },
        visibility: 10000,
        wind: { speed: 2.6, deg: 80 },
        clouds: { all: 13 },
        dt: 1597063048,
        sys: {
          type: 1,
          id: 1414,
          country: "GB",
          sunrise: 1597034324,
          sunset: 1597087983
        },
        timezone: 3600,
        id: 2643743,
        name: "London",
        cod: 200
      })
      .onGet()
      .replyOnce(200, [
        { id: 7287676, name: "L'Abbaye, Switzerland (6.30°, 46.64°)" },
        { id: 2660080, name: "L'Abbaye, Switzerland (6.32°, 46.65°)" }
      ]);

    render(<App />);

    expect(
      await screen.findByText(/Weather in London right now/)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter location name/)
    ).toBeInTheDocument();
  });
});
