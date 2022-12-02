import React from "react";
import "./PopularCard.scss";

interface PopularCardProps {
  cels: boolean;
  name: string;
  data: {
    timezone: string;
    currentConditions: {
      datetime: string;
      temp: number;
      humidity: number;
      conditions: string;
      icon: string;
      windspeed: number;
    };
  };
}

const PopularCard: React.FC<PopularCardProps> = (props) => {
  if (!props.data.currentConditions.icon) return null;
  return (
    <div id="popular-card">
      <div className="city">{props.name}</div>
      <div className="img-box">
        <img
          src={require(`../Icons/${props.data.currentConditions.icon}.svg`)}
          alt="weather icon"
        />
      </div>
      <div className="temp">
        {props?.cels && `${Math.round(props.data.currentConditions.temp)}°C`}
        {!props?.cels &&
          `${Math.round(props.data.currentConditions.temp * 1.8 + 32)}°F`}
      </div>
      <div className="comment">{props.data.currentConditions.conditions}</div>
      <div className="wind">
        Wind speed: {Math.round(props.data.currentConditions.windspeed)} km/h
      </div>
      <div className="time">
        Last updated: {props.data.currentConditions.datetime}
      </div>
    </div>
  );
};

export default PopularCard;
