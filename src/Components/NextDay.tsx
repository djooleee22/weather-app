import React from "react";
import "./NextDay.scss";

interface NextDayProps {
  data: {
    conditions: string;
    datetime: string;
    icon: string;
    tempmax: number;
    tempmin: number;
  };
  celsius: boolean;
}

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

const NextDay: React.FC<NextDayProps> = (props) => {
  const day = new Date(props.data.datetime).getDay()
  const minMax = () => {
    if (props.celsius) {
      return `${Math.round(props.data.tempmin)}°C - ${Math.round(props.data.tempmax)}°C`;
    } else {
      return `${Math.round(props.data.tempmin*1.8 + 32)}°F - ${Math.round(props.data.tempmax*1.8 + 32)}°F`;
    }
  };
  return (
    <div id="next-day">
      <div className="day-sm">{days[day]}</div>
      <img src={require(`../Icons/${props.data.icon}.svg`)} alt="icon" />
      <div className="comment-sm">{props.data.conditions}</div>
      <div className="min-max">{minMax()}</div>
    </div>
  );
};

export default NextDay;
