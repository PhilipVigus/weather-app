import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./Main";

const mockStore = configureStore([]);

describe("Main", () => {
  it("renders Hello World", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });

  it("renders the state value in the redux store", () => {
    const store = mockStore({
      test: "This is a test"
    });

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText(/This is a test/)).toBeInTheDocument();
  });
});
