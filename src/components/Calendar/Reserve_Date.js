import React from "react";
import "./ReserveDate.css";

const Reserve_Date = (props) => {
  return (
    <div className="reserve-date">
      <div className="reserve-date_month">{props.month}</div>
      <div className="reserve-date_year">{props.year}</div>
      <div className="reserve-date_year">{props.date}</div>
      <div className="reserve-date_day">{props.day}</div>
    </div>
  );
};

export default Reserve_Date;
