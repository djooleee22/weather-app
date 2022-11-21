import React, { useEffect, useState, useRef, FormEvent } from "react";
import "./App.scss";
import MainCard from "./Components/MainCard";

export interface FetchedData {
  airIndex?: string;
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

const key = "89b26d36-5c22-49ee-b703-d5fb3d224ecc";

function App() {
  const [data, setData] = useState<FetchedData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [airIndex, setAirIndex] = useState<string>("X");
  const [celsius, setCelsius] = useState<boolean>(true);
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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const enteredText = inputRef.current!.value.toLowerCase();
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${enteredText}`)
      .then((res) => res.json())
      .then((dataRes) => {
        setData({
          currentConditions: dataRes.currentConditions,
          region: dataRes.region,
          next_days: dataRes.next_days,
        });
        inputRef.current!.value = "";
      });
  };

  if (!data) {
    return null;
  }

  return (
    <div id="App">
      <div className="wrapper">
        <div className="buttons">
          <button
            className={celsius ? "active" : ""}
            onClick={() => setCelsius(true)}
          >
            °C
          </button>
          <button
            className={!celsius ? "active" : ""}
            onClick={() => setCelsius(false)}
          >
            °F
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Enter city name" ref={inputRef} />
        </form>
        <MainCard
          currentConditions={data?.currentConditions}
          region={data?.region}
          next_days={data?.next_days}
          airIndex={airIndex}
          celsius={celsius}
          setCelsius={setCelsius}
        />
      </div>
    </div>
  );
}

export default App;
