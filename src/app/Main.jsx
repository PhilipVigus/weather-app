import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const test = useSelector((state) => state);
  return (
    <div>
      <div>{test.test}</div>
      <div>Hello World!!!!111111</div>
    </div>
  );
};

export default Main;
