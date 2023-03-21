import React from "react";
import "./announcment.css";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CampaignIcon from "@mui/icons-material/Campaign";

function OneAnnouncment(props) {
  console.log(props);
  const date = props.announcement.issuedAt;
  const dateparse = new Date(date).toLocaleDateString();

  console.log(typeof date);
  console.log("date", dateparse);
  return (
    <div>
      <p className="announcment_title">
        <CampaignIcon />
        {"  "} {props.announcement.announce.title}
        <KeyboardDoubleArrowRightIcon />
        <span className="announcement-date">Announced at </span> {dateparse}
      </p>

      <p className="announcement-desc">
        {props.announcement.announce.description}
      </p>
      {/*{" "}
      <div className="info">
        {" "}
        <Alert variant="warning">
          <Alert.Heading>{props.announcement.announce.title} </Alert.Heading>
          <p>{props.announcement.announce.description}</p>
          {" "}
        </Alert> */}
      {/* <Alert variant="warning">
        <Alert.Heading>Lorem ipsum dolor sit amet</Alert.Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Alert> */}
      {/* <div className="announce-p">
        <p>
          <span>{props.announcement.announce.title} </span>
          {props.announcement.announce.description}
        </p>
      </div> */}
    </div>
  );
}

export default OneAnnouncment;
