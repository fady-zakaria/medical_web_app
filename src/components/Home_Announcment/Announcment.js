import React from "react";
import "./announcment.css";
import { Link } from "react-router-dom";
import OneAnnouncment from "./OneAnnouncment";

const Announcment = ({ Announcments }) => {
  console.log(Announcments);
  return (
    <>
      {Announcments.length !== 0 &&
        Announcments.map((announcement) => (
          <div className="announce-container">
            <OneAnnouncment announcement={announcement} key={announcement.id} />
          </div>
        ))}

      {/* <div className="alert-icon">
        <i class="bi bi-exclamation-triangle"></i>
        <p className="announce-word">Announcement</p>
      </div>
      <div className="All_announcement">
        {Announcments.length !== 0 &&
          Announcments.map((announcement) => (
            <OneAnnouncment announcement={announcement} key={announcement.id} />
          ))}
      </div> */}
    </>
  );
};

export default Announcment;
