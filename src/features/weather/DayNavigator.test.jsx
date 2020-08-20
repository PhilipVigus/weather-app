import React from "react";
import { render, screen } from "@testing-library/react";
import DayNavigator from "./DayNavigator";

describe("DayNavigator", () => {
  it("renders the days", () => {
    render(
      <DayNavigator days={["Monday", "Tuesday"]} clickCallback={() => {}} />
    );

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
  });
});
