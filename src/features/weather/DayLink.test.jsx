import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DayLink from "./DayLink";

describe("DayNavigator", () => {
  it("renders the day", () => {
    const callback = jest.fn();

    render(
      <DayLink day="Monday" index={1} clickCallback={callback} hasFocus />
    );

    expect(screen.getByText("Monday")).toBeInTheDocument();
  });

  it("calls the callback when you click the link", () => {
    const callback = jest.fn();

    render(
      <DayLink day="Monday" index={1} clickCallback={callback} hasFocus />
    );

    const link = screen.getByText("Monday");
    fireEvent.click(link);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);
  });
});
