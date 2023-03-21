import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ marginTop: "auto" }}>
      <div className="footer-container">
        <p className="footer-p">Copyright © 2022 Future Medical</p>
        <Link to="/complaint">
          <div>
            <i
              class="bi bi-pencil"
              style={{ marginTop: "-3px", cursor: "pointer", color: "white" }}
            ></i>
            <button className="complaints_btn">Complaints</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
