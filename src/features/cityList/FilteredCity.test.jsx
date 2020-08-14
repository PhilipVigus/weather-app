import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilteredCity from "./FilteredCity";

describe("FilteredCity", () => {
  it("renders the name", () => {
    const callback = jest.fn();
    render(<FilteredCity name="London" id="133" callback={callback} />);

    expect(screen.getByText(/London/)).toBeInTheDocument();
  });

  it("calls the callback when you click on it", () => {
    const callback = jest.fn();
    render(<FilteredCity name="London" id="133" callback={callback} />);
    const city = screen.getByText(/London/);
    fireEvent.click(city);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
