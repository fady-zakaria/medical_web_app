import React, { useState } from "react";
import "./options.css";
import { useSelector, useDispatch } from "react-redux";
import { signin, logout } from "../../../actions";
import { chart, info, info_doc } from "../../../actions";
import { Link, useNavigate } from "react-router-dom";

const LogoutOption = () => {
  const [loggedout, setloggedout] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  const initstate = () => {
    ////GO BACK ALL STATES TO INIT STATES
    dispatch(logout());
    dispatch(chart());
    dispatch(info());
    dispatch(info_doc());
    navigate("/");
    setloggedout(true);
  };

  return (
    <>
      {token.token ? (
        <div className="options">
          <div className="options-container">
            <button className="option-item-imp" onClick={initstate}>
              Logout
            </button>
          </div>
        </div>
      ) : !loggedout ? (
        <div>You are not logged in yet</div>
      ) : (
        <div>Logout is done successfully ✔ </div>
      )}
    </>
  );
};

export default LogoutOption;
