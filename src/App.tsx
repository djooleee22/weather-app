import React, { useEffect, useState, useRef, FormEvent } from "react";
import "./App.scss";
import MainCard from "./Components/MainCard";

export interface FetchedData {
  airIndex?: string;
  currentConditions: {
    conditions: string;
    datetime: string;
    humidity: number;
    icon: string;
    precip: number;
    temp: number;
    windspeed: number;
  };
  region: string;
  next_days: {
    conditions: string;
    datetime: string;
    icon: string;
    tempmax: number;
    tempmin: number;
  }[];
}

function App() {
  const [data, setData] = useState<FetchedData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [airIndex] = useState<string>("X");
  const [celsius, setCelsius] = useState<boolean>(true);
  const fetchData = () => {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/belgrade?unitGroup=metric&include=current%2Cdays&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json")
      .then((res) => res.json())
      .then((dataRes) => {
        setData({
          currentConditions: dataRes.currentConditions,
          region: dataRes.timezone,
          next_days: dataRes.days,
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
