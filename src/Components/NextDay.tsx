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
}

const NextDay: React.FC<NextDayProps> = (props) => {
  return (
    <div id="next-day">
      <div className="day-sm">{props.data.day}</div>
      <img src={props.data.iconURL} alt="icon" />
      <div className="comment-sm">{props.data.comment}</div>
      <div className="min-max">
        {props.data.min_temp.c}°C - {props.data.max_temp.c}°C
      </div>
    </div>
  );
};

export default NextDay;
