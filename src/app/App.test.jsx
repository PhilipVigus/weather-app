import React from "react";
import { render, screen } from "@testing-library/react";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";
import londonFullName from "../fixtures/londonFullName";
import londonWeatherNow from "../fixtures/londonWeatherNow";
import londonWeatherForecast from "../fixtures/londonWeatherForecast";

describe("App", () => {
  it("renders the weather now and location list", async () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const mockAxios = new MockAdapter(Axios);
    mockAxios
      .onGet(/\/locations\/names\//)
      .replyOnce(200, londonFullName)
      .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/weather/)
      .replyOnce(200, londonWeatherNow)
      .onGet(/https:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast/)
      .replyOnce(200, londonWeatherForecast);

    render(<App />);

    expect(await screen.findByText(/87% humidity/)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter location name/)
    ).toBeInTheDocument();

    mockAxios.reset();
    mockAxios.restore();
  });
});
