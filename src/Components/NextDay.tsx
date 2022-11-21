import React from "react";
import "./NextDay.scss";

interface NextDayProps {
  data: {
    comment: string;
    day: string;
    iconURL: string;
    max_temp: { c: number; f: number };
    min_temp: { c: number; f: number };
  };
  celsius: boolean;
}

const NextDay: React.FC<NextDayProps> = (props) => {
  const minMax = () => {
    if (props.celsius) {
      return `${props.data.min_temp.c}°C - ${props.data.max_temp.c}°C`;
    } else {
      return `${props.data.min_temp.f}°F - ${props.data.max_temp.f}°F`;
    }
  };
  return (
    <div id="next-day">
      <div className="day-sm">{props.data.day}</div>
      <img src={props.data.iconURL} alt="icon" />
      <div className="comment-sm">{props.data.comment}</div>
      <div className="min-max">{minMax()}</div>
    </div>
  );
};

export default NextDay;
