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

const NextDay: React.FC<NextDayProps> = (props) => {
  const minMax = () => {
    if (props.celsius) {
      return `${Math.round(props.data.tempmin)}°C - ${Math.round(props.data.tempmax)}°C`;
    } else {
      return `${Math.round(props.data.tempmin)}°F - ${Math.round(props.data.tempmax)}°F`;
    }
  };
  return (
    <div id="next-day">
      <div className="day-sm">{props.data.datetime}</div>
      <img src={props.data.icon} alt="icon" />
      <div className="comment-sm">{props.data.conditions}</div>
      <div className="min-max">{minMax()}</div>
    </div>
  );
};

export default NextDay;
