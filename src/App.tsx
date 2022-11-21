import React, { useEffect, useState } from "react";
import "./App.scss";
import MainCard from "./Components/MainCard";

export interface FetchedData {
  currentConditions: {
    comment: string;
    dayhour: string;
    humidity: string;
    iconURL: string;
    precip: string;
    temp: { c: number; f: number };
    wind: { km: number; mile: number };
  };
  region: string;
  next_days: {
    comment: string;
    day: string;
    iconURL: string;
    max_temp: { c: number; f: number };
    min_temp: { c: number; f: number };
  }[];
}
function App() {
  const [data, setData] = useState<FetchedData | null>(null);
  const fetchData = () => {
    fetch("https://weatherdbi.herokuapp.com/data/weather/belgrade")
      .then((res) => res.json())
      .then((dataRes) => {
        setData({
          currentConditions: dataRes.currentConditions,
          region: dataRes.region,
          next_days: dataRes.next_days,
        });
      });
  };
  useEffect(fetchData, []);
  console.log(data);

  if (!data) {
    return null;
  }

  return (
    <div id="App">
      <div className="wrapper">
        <input type="text" placeholder="Enter city name" />
        <MainCard
          currentConditions={data?.currentConditions}
          region={data?.region}
          next_days={data?.next_days}
        />
      </div>
    </div>
  );
}

export default App;
