import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./coupon.css";

var code_generated;
const Coupon = (props) => {
  const [code_text, SetCodeText] = useState("");
  const [invalidCode, SetInvalidCode] = useState(false);
  const [error_text, SetError] = useState("");
  // const code_generated = "1234";

  useEffect(() => {
    var cc = require("coupon-code");
    code_generated = cc.generate();
    SetCodeText("");
  }, []);

  const handleCode = (e) => {
    e.preventDefault();
    if (code_text === "") {
      SetError("!! Required Code");
    } else if (code_text !== code_generated) {
      SetError("!! Incorrect Code");
    } else if (code_text === code_generated) {
      console.log("right_code");
      props.validcode(true);
      props.close();
      // SetError("Correct_codeeeeee");
    } else {
      SetError("");
    }
  };
  return (
    <div>
      <div className="coupon-container">
        <div className="coupon-card">
          <div className="image1free">
            <img
              alt="freecouponimg1"
              src="/assets/images/free4.png"
              width="120"
            />
          </div>
          <form className="form">
            <h1 className="coupon-code">
              <code style={{ color: "white" }}>
                Coupon code <br /> {code_generated}
              </code>
            </h1>
            <div style={{ paddingBottom: "1rem" }}>
              <input
                type="text"
                name="code"
                placeholder="Paste Coupon Code"
                required
                autoComplete="off"
                onChange={(e) => {
                  SetCodeText(e.target.value);
                  SetError("");
                }}
              />
              <h6 style={{ color: "red" }}>{error_text}</h6>
            </div>
            <div>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                onClick={handleCode}
                style={{ marginRight: "1rem" }}
              >
                Submit
              </Button>
              <Button
                variant="text"
                onClick={props.close}
                style={{ color: "white" }}
              >
                Close
              </Button>
            </div>
          </form>
          <div className="image2free">
            <img
              alt="freecouponimg2"
              src="/assets/images/free4.png"
              width="120"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
