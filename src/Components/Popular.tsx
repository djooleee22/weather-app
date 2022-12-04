import React, { useEffect, useState } from "react";
import "./Popular.scss";
import PopularCard from "./PopularCard";
import { CircularProgress } from "@mui/material";

interface CityState {
  timezone: string;
  currentConditions: {
    datetime: string;
    temp: number;
    humidity: number;
    conditions: string;
    icon: string;
    windspeed: number;
  };
}

const fetchData = (
  url: string,
  cb: React.Dispatch<React.SetStateAction<CityState>>
) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      cb!(data);
    });
};

const initialState = {
  timezone: "",
  currentConditions: {
    datetime: "",
    temp: 0,
    humidity: 0,
    conditions: "",
    icon: "",
    windspeed: 0,
  },
};
const Popular: React.FC = (props) => {
  const [london, setLondon] = useState<CityState>(initialState);
  const [newYork, setNewYork] = useState<CityState>(initialState);
  const [moscow, setMoscow] = useState<CityState>(initialState);
  const [madrid, setMadrid] = useState<CityState>(initialState);
  const [cels, setCels] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  //had some bug with Promise.all,try again later
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json",
        setLondon
      );
      fetchData(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/new%20york?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json",
        setNewYork
      );
      fetchData(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/moscow?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json",
        setMoscow
      );
      fetchData(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/madrid?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json",
        setMadrid
      );

      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div id="popular">
      {loading && <CircularProgress className="spinner" />}
      {!loading && (
        <>
          <div className="buttons">
            <button
              className={cels ? "active" : ""}
              onClick={() => setCels(true)}
            >
              °C
            </button>
            <button
              className={!cels ? "active" : ""}
              onClick={() => setCels(false)}
            >
              °F
            </button>
          </div>
          <PopularCard data={london} name="London" cels={cels} />
          <PopularCard data={newYork} name="New York" cels={cels} />
          <PopularCard data={moscow} name="Moscow" cels={cels} />
          <PopularCard data={madrid} name="Madrid" cels={cels} />
        </>
      )}
    </div>
  );
};

export default Popular;
