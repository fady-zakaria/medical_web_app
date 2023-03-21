import React from "react";
import "./options.css";
import { Link } from "react-router-dom";

const Options = (props) => {
  const options = [
    {
      text: "Hospitals",
      handler: () => {},
      id: 1,
      link: "/Entities/hospitals",
    },
    {
      text: "Specializations",
      handler: () => {
        window.scrollTo(0, 1100);
      },
      id: 2,
      link: "/",
    },
    {
      text: "Clinics",
      handler: () => {},
      id: 3,
      link: "/Entities/clinics",
    },
    {
      text: "Pharmacies",
      handler: () => {},
      id: 4,
      link: "/Entities/pharmacies",
    },
    {
      text: "Maps",
      handler: () => {},
      id: 5,
      link: "/maps",
    },
    {
      text: "Complaints",
      handler: () => {},
      id: 6,
      link: "/complaint",
    },
  ];

  const ButtonMarkUp = options.map((option) => (
    <Link to={option.link}>
      <button className="option-item" onClick={option.handler} key={option.id}>
        {option.text}
      </button>
    </Link>
  ));

  let right = {};

  const oneoption = () => {
    // options.map((option) => {
    for (let option of options) {
      // console.log("true", option);
      if (props.id === option.id) {
        right = {
          text: option.text,
          handler: option.handler,
          id: option.id,
          link: option.link,
        };
        break;
      }
    }
  };

  const rendercondition = () => {
    if (props.id === 0) {
      return true;
    } else {
      oneoption();
      return false;
    }
  };

  return (
    <div className="options">
      <div className="options-container">
        {rendercondition() ? (
          ButtonMarkUp
        ) : (
          <Link to={right.link}>
            <button
              className="option-item"
              onClick={right.handler}
              key={right.id}
            >
              {right.text}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Options;
