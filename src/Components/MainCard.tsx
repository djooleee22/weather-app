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

interface MainCardProps extends FetchedData {
  celsius: boolean;
  setCelsius: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainCard: React.FC<MainCardProps | null> = (props) => {
  const [nextDays, setNextDays] = useState<NextDaysData[]>([]);
  useEffect(() => {
    const filtered = props!.next_days.filter(
      (el, i) => i > 0 && i < props!.next_days.length - 1
    );
    setNextDays(filtered);
  }, []);

  return (
    <div id="main-card">
      <div className="left">
        <div className="helper">
          <img src={props?.currentConditions.iconURL} alt="icon" />
          <div className="temp">
            {props?.celsius
              ? props?.currentConditions.temp.c
              : props?.currentConditions.temp.f}
            {props?.celsius ? "°C" : "°F"}
          </div>
          <div className="time-date">{props?.currentConditions.dayhour}</div>
          <div className="comment">{props?.currentConditions.comment}</div>
          <div className="region">
            <span>{props?.region}</span>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="next">
          {nextDays.map((el) => (
            <NextDay key={el.day} data={el} celsius={props!.celsius} />
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
            <div>{props?.airIndex}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
