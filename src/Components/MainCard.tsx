import React, { useState, useEffect } from "react";
import "./MainCard.scss";
import NextDay from "./NextDay";
import { FetchedData } from "../App";

interface NextDaysData {
  conditions: string;
  datetime: string;
  icon: string;
  tempmax: number
  tempmin: number;
}

interface MainCardProps extends FetchedData {
  celsius: boolean;
  setCelsius: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainCard: React.FC<MainCardProps | null> = (props) => {
  const [nextDays, setNextDays] = useState<NextDaysData[]>([]);
  useEffect(() => {
    const filtered = props!.next_days.filter(
      (el, i) => i > 0 && i < 7
    );
    setNextDays(filtered);
  }, [props]);

  return (
    <div id="main-card">
      <div className="left">
        <div className="helper">
          <img src={props?.currentConditions.icon} alt="icon" />
          <div className="temp">
            {props?.celsius && `${Math.round(props!.currentConditions.temp)}°C`}
            {!props?.celsius && `${Math.round(props!.currentConditions.temp)}°F`}
          </div>
          <div className="time-date">{props?.currentConditions.datetime}</div>
          <div className="comment">{props?.currentConditions.conditions}</div>
          <div className="region">
            <span>{props?.region}</span>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="next">
          {nextDays.map((el) => (
            <NextDay key={el.datetime} data={el} celsius={props!.celsius} />
          ))}
        </div>
        <div className="more-info">
          <div className="rain">
            Rain
            <img
              src="https://cdn-icons-png.flaticon.com/128/3313/3313888.png"
              alt="rain icon"
            />
            <div>{(props?.currentConditions.precip)}%</div>
          </div>
          <div className="humidity">
            Humidity
            <img
              src="https://cdn-icons-png.flaticon.com/128/5664/5664979.png"
              alt="humidity icon"
            />
            <div>{Math.round(props!.currentConditions.humidity)}%</div>
          </div>
          <div className="wind">
            Wind
            <img
              src="https://cdn-icons-png.flaticon.com/128/2057/2057945.png"
              alt="wind icon"
            />
            <div>{Math.round(props!.currentConditions.windspeed)}km/h</div>
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
