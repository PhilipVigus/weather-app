import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilteredLocation from "./FilteredLocation";

describe("FilteredLocation", () => {
  const TEST_ID = 133;

  it("renders the name", () => {
    const callback = jest.fn();

    render(<FilteredLocation name="London" id={TEST_ID} callback={callback} />);

    expect(screen.getByText(/London/)).toBeInTheDocument();
  });

  it("calls the callback when you click on the component", () => {
    const callback = jest.fn();

    render(<FilteredLocation name="London" id={TEST_ID} callback={callback} />);

    const location = screen.getByText(/London/);
    fireEvent.click(location);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("calls the callback when you press return after giving the component focus", () => {
    const callback = jest.fn();

    render(<FilteredLocation name="London" id={TEST_ID} callback={callback} />);

    const location = screen.getByText(/London/);
    fireEvent.focus(location);
    fireEvent.keyDown(location, { key: "Enter", code: "Enter" });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
