import React, { useState, useEffect } from "react";
import "./MainCard.scss";
import NextDay from "./NextDay";
import { FetchedData } from "../App";

interface NextDaysData {
  comment: string;
  day: string;
  iconURL: string;
  max_temp: { c: number; f: number };
  min_temp: { c: number; f: number };
}

const MainCard: React.FC<FetchedData | null> = (props) => {
  const [nextDays, setNextDays] = useState<NextDaysData[]>([]);
  useEffect(() => {
    const filtered = props!.next_days.filter(
      (el, i) => i > 0 && i < props!.next_days.length - 1
    );
    setNextDays(filtered);
  }, []);
  console.log(nextDays);

  return (
    <div id="main-card">
      <div className="left">
        <div className="helper">
          <img src={props?.currentConditions.iconURL} alt="icon" />
          <div className="temp">{props?.currentConditions.temp.c}°C</div>
          <div className="time-date">{props?.currentConditions.dayhour}</div>
          <div className="comment">{props?.currentConditions.comment}</div>
          <div className="region">
            <span>{props?.region}</span>
            <img
              src="https://freesvg.org/storage/img/thumb/1290032361.png"
              alt="city"
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="next">
          {nextDays.map((el) => (
            <NextDay data={el} />
          ))}
        </div>
        <div className="more-info">
          <div className="rain">
            Rain
            <img
              src="https://cdn-icons-png.flaticon.com/128/3313/3313888.png"
              alt="rain icon"
            />
            <div>{props?.currentConditions.precip}</div>
          </div>
          <div className="humidity">
            Humidity
            <img
              src="https://cdn-icons-png.flaticon.com/128/5664/5664979.png"
              alt="humidity icon"
            />
            <div>{props?.currentConditions.humidity}</div>
          </div>
          <div className="wind">
            Wind
            <img
              src="https://cdn-icons-png.flaticon.com/128/2057/2057945.png"
              alt="wind icon"
            />
            <div>{props?.currentConditions.wind.km}km/h</div>
          </div>
          <div className="air">
            Air
            <img
              src="https://cdn-icons-png.flaticon.com/128/2910/2910057.png"
              alt="air icon"
            />
            <div>123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
