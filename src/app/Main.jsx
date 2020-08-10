import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const data = useSelector((state) => state);
  return (
    <div>
      <div>{data.test}</div>
      <div>Hello World!!!!111111</div>
    </div>
  );
};

export default Main;
