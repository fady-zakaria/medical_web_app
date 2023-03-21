import React from "react";
import "./options.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const OneOption = (props) => {
  let dispatch = useDispatch();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  console.log("props_from_one_options", props);

  return (
    <>
      {props.id === 7 ? (
        token.token ? (
          <div className="options">
            <div className="options-container">
              <Link to="/user">
                <button className="option-item">Profile</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="options">
            <div className="options-container">
              <Link to="/login">
                <button className="option-item">Login</button>
              </Link>
            </div>
          </div>
        )
      ) : (
        ""
      )}
      {props.id === 8 &&
        (!token.token ? (
          <div className="options">
            <div className="options-container">
              <Link to="/login">
                <button className="option-item">Login</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>You are already logged in</div>
        ))}

      {props.id === 9 && (
        <div className="options">
          <div className="options-container">
            <Link to="/">
              <button className="option-item">Home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default OneOption;
