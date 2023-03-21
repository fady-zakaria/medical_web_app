import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VideoChat from "../../components/Meeting_room/Video_chat/VideoChat";
import Tooltip from "@mui/material/Tooltip";
import { channel_name, leave } from "./../../actions";
import { Button, Table, useAccordionButton, Alert } from "react-bootstrap";
import { logout } from "../../actions";
import { AiFillClockCircle } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";

function Userappointments() {
  const action_state = JSON.parse(
    useSelector((state) => state.meeting_reducer)
  );
  console.log(action_state);
  let navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const navigation = (docid, docname) => {
    navigate(`/doctor/${docname}`, { state: { Doctor_id: docid } });
  };
  const dispatch = useDispatch();
  dispatch(channel_name(""));

  const token = JSON.parse(useSelector((state) => state.auth));
  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const [meetings_api, setmeetings] = useState([]);

  const get_meetings = async () => {
    try {
      const res = await axios.get(
        "https://future-medical.herokuapp.com/user/meetings",
        config
      );

      console.log(res.data);
      if (res.data === "you have no meetings yet") {
        setloading(false);
        return;
      }
      setmeetings(res.data);
      setloading(false);
    } catch (err) {
      if (err.response) {
        if (err.response.data === "not authorized, token is failed") {
          dispatch(logout());
          navigate("/login");
        }
      }
    }
  };

  var meetings = [];
  const current = new Date();
  let state;

  for (var i = 0; i < meetings_api.length; i++) {
    const day = meetings_api[i].Date.split("T")[0]
      .split("-")
      .reverse()
      .join("-")
      .split("-");
    if (parseInt(day[2]) < current.getFullYear()) state = "Done"; //year check
    else if (parseInt(day[2]) > current.getFullYear())
      state = "Pending"; //next year
    else if (
      parseInt(day[1]) === current.getMonth() + 1 &&
      parseInt(day[0]) === current.getDate() &&
      parseInt(day[2]) === current.getFullYear()
    )
      state = "Today";
    else if (parseInt(day[1]) < current.getMonth() + 1)
      state = "Done"; //month check
    else if (
      parseInt(day[1]) === current.getMonth() + 1 &&
      parseInt(day[0]) < current.getDate()
    )
      state = "Done"; //month check
    else state = "Pending";
    meetings.push({
      id: i,
      dr_name: meetings_api[i].doctor.username,
      slot: meetings_api[i].slot,
      date: meetings_api[i].Date,
      state: state,
      email: meetings_api[i].doctor.email,
    });
  }

  //sorting
  if (meetings.length !== 0) {
    meetings.sort((a, b) => {
      const c = new Date(a.date.split("-").reverse().join("-"));
      const d = new Date(b.date.split("-").reverse().join("-"));
      return c - d;
    });
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(" ")
    );
    return (
      <Button type="button" onClick={decoratedOnClick} variant="primary">
        {children}
      </Button>
    );
  }

  //meeting button
  const local_date = new Date();
  var utc_offset = local_date.getTimezoneOffset() / 60;
  console.log(utc_offset);
  var utc = (2 + utc_offset) * 60;
  var hour = local_date.getHours();
  var min = local_date.getMinutes();
  local_date.setMinutes(min + utc);
  hour = local_date.getHours();
  min = local_date.getMinutes();
  console.log(hour, min);
  console.log(local_date);

  const check_button_state = (item) => {
    if (
      item.state === "Today" &&
      hour === parseInt(item.slot.split("-")[0].split(":")[0])
    ) {
      if (min < 30 && parseInt(item.slot.split("-")[0].split(":")[1]) === 0) {
        return (
          <VideoChat
            dr_email={item.email}
            slot={item.slot}
            button_state={true}
          />
        );
      } else if (
        min >= 30 &&
        parseInt(item.slot.split("-")[0].split(":")[1]) === 30
      ) {
        return (
          <VideoChat
            dr_email={item.email}
            slot={item.slot}
            button_state={true}
          />
        );
      } else {
        return (
          <VideoChat
            dr_email={item.email}
            slot={item.slot}
            button_state={false}
          />
        );
      }
    } else {
      return (
        <VideoChat
          dr_email={item.email}
          slot={item.slot}
          button_state={false}
        />
      );
    }
  };

  useEffect(() => {
    get_meetings();
  }, []);

  return (
    <div className="card">
      <div className="card-header bg-transparent border-0">
        <h3 className="mb-0">
          <AiFillClockCircle /> Appointments
        </h3>
      </div>
      {loading ? (
        <div style={{ margin: "auto" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="card-body pt-0">
          <div>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th width="20%">Date</th>
                  <th width="20%">Time</th>
                  <th width="20%">Dr Name</th>
                  <th width="20%">Meeting</th>

                  <th width="20%">State</th>
                </tr>
              </thead>
              <tbody>
                {meetings.length === 0 ? (
                  <>
                    <Alert
                      key="primary"
                      variant="primary"
                      style={{ margin: "1rem 2rem" }}
                    >
                      There are no meetings yet.
                    </Alert>
                  </>
                ) : (
                  <>
                    {meetings.reverse().map((item) => (
                      <tr
                        key={item.id}
                        style={
                          item.state === "Pending"
                            ? { opacity: "1" }
                            : item.state === "Today"
                            ? { background: "#B9D9EB" }
                            : { opacity: "0.5" }
                        }
                      >
                        <td width="20%">
                          {item.date
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td width="20%">{item.slot}</td>

                        <td
                          style={{ cursor: "pointer" }}
                          width="20%"
                          onClick={() => {
                            navigation(item.email, item.dr_name);
                          }}
                        >
                          <Link to={`/doctor/${item.dr_name}`}>
                            {item.dr_name}
                          </Link>
                        </td>
                        <td width="20%">{check_button_state(item)}</td>
                        <td width="20%">{item.state}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userappointments;
