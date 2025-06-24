import React from "react";

const Weather = ({ temp }) => {
  const Below = () => <h1>It's cold outside.</h1>;
  const Between = () => <h1>It's nice outside.</h1>;
  const Above = () => <h1>It's hot outside.</h1>;

  if (temp < 15) return <Below />;
  else if (temp >= 15 && temp <= 25) return <Between />;
  else return <Above />;
};

export default Weather;
